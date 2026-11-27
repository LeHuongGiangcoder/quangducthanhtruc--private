"use client";

import { useState, type FormEvent } from "react";

import { useGuest } from "@/components/experience/GuestProvider";
import { Button } from "@/components/ui/Button";
import { Caption, Heading, Lead, Script, Title } from "@/components/ui/Heading";
import { Choice, Field, FieldLabel } from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { rsvp } from "@/content/client";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Form RSVP.
 *
 * Dữ liệu đi thẳng tới Glow RSVP Hub theo đúng hợp đồng trong skill glow-rsvp:
 *
 *   • POST, Content-Type `text/plain;charset=utf-8` — để Apps Script không
 *     dính CORS preflight (nó không trả lời được preflight).
 *   • Body là MỘT object phẳng: `client` + đúng các field của form.
 *   • Không gửi key rỗng và không gửi state của giao diện (status, step…).
 *   • Hub tự đổi "yes"/"no" thành Có/Không, nên gửi nguyên chuỗi đó.
 *
 * Thêm hay đổi tên field ở đây thì phải chạy lại:
 *   ~/glow-tools/glow-rsvp.sh fields <client> --fields "key=Nhãn;…"
 *
 * `rsvp.endpoint` còn trống (khung nền chưa nối Sheet) thì form vẫn chạy đủ
 * và báo thành công, chỉ không gửi đi đâu cả.
 */
export function Rsvp() {
  const { guest } = useGuest();
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guests, setGuests] = useState<string>(rsvp.fields.guests.options[0]);
  const [otherGuests, setOtherGuests] = useState("");

  const personalized = rsvp.mode === "personalized";
  const fields = rsvp.fields;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const going = attending === "yes";

    // Thứ tự các key ở đây chính là thứ tự cột trong Sheet của khách.
    const values: Record<string, string | number> = {
      name: guest?.name ?? String(data.get("name") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      attending,
      guests: going ? (guests === "other" ? otherGuests.trim() : guests) : "",
      meal: going ? String(data.get("meal") ?? "").trim() : "",
      message: String(data.get("message") ?? "").trim(),
    };

    // Khách vào bằng link mời riêng: gửi kèm slug để hub ghi đúng dòng của họ.
    if (personalized && guest?.slug) values.slug = guest.slug;

    // Không gửi key rỗng — cột trống trong Sheet là rác.
    for (const [key, value] of Object.entries(values)) {
      if (value === "") delete values[key];
    }

    setStatus("sending");

    if (!rsvp.endpoint || !rsvp.client) {
      // Chưa chạy skill glow-rsvp. Vẫn cho khách thấy màn cảm ơn khi dựng thử.
      console.info("[rsvp] chưa nối hub, dữ liệu sẽ gửi:", values);
      setStatus("sent");
      return;
    }

    try {
      const res = await fetch(rsvp.endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ client: rsvp.client, ...values }),
      });
      const payload = (await res.json()) as { ok?: boolean };
      setStatus(payload?.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <SectionWrapper section="rsvp" width="prose" labelledBy="rsvp-heading">
      {/* Form đặt thẳng trên nền damask kem của cả section (tông sáng) —
          không còn tấm giấy riêng. */}
      <Reveal>
        <div className="text-tone-fg">
        <div className="mx-auto mb-block flex flex-col items-center gap-tight text-center">
          <Title id="rsvp-heading">{rsvp.heading}</Title>
          <Heading level="h3" className="uppercase">
            {rsvp.title}
          </Heading>
          {personalized && guest ? <Lead>{`${rsvp.greeting} ${guest.name}`}</Lead> : null}
        </div>
        <div className="pb-block">
        {status === "sent" ? (
          <div role="status" className="flex flex-col items-center gap-stack text-center">
            <Heading level="h3">{rsvp.success[attending].title}</Heading>
            <Script>{rsvp.success[attending].note}</Script>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Sửa lại câu trả lời
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-block">
            {/* Khách đã có tên trong Sheet thì khỏi hỏi lại */}
            {personalized && guest ? null : (
              <Field label={fields.name.label} htmlFor="rsvp-name">
                <input
                  id="rsvp-name"
                  name="name"
                  required
                  autoComplete="name"
                  maxLength={80}
                  placeholder={fields.name.placeholder}
                  className="field-input"
                />
              </Field>
            )}

            <Field label={fields.contact.label} htmlFor="rsvp-contact">
              <input
                id="rsvp-contact"
                name="contact"
                required
                autoComplete="tel"
                maxLength={120}
                placeholder={fields.contact.placeholder}
                className="field-input"
              />
            </Field>

            <fieldset className="flex flex-col gap-tight">
              <FieldLabel as="legend">{fields.attending.label}</FieldLabel>
              <Choice
                name="attending"
                value="yes"
                checked={attending === "yes"}
                onChange={() => setAttending("yes")}
              >
                {fields.attending.yes}
              </Choice>
              <Choice
                name="attending"
                value="no"
                checked={attending === "no"}
                onChange={() => setAttending("no")}
              >
                {fields.attending.no}
              </Choice>
            </fieldset>

            {/* Không tham dự thì bỏ qua câu 4 và 5, đi thẳng xuống lời chúc */}
            {attending === "yes" ? (
              <>
                <fieldset className="flex flex-col gap-tight">
                  <FieldLabel as="legend">{fields.guests.label}</FieldLabel>
                  {fields.guests.options.map((n) => (
                    <Choice
                      key={n}
                      name="guests"
                      value={n}
                      checked={guests === n}
                      onChange={() => setGuests(n)}
                    >
                      {n}
                    </Choice>
                  ))}
                  <Choice
                    name="guests"
                    value="other"
                    checked={guests === "other"}
                    onChange={() => setGuests("other")}
                  >
                    {fields.guests.other}
                  </Choice>
                  {guests === "other" ? (
                    <input
                      aria-label={fields.guests.otherPlaceholder}
                      name="guestsOther"
                      required
                      inputMode="numeric"
                      maxLength={20}
                      value={otherGuests}
                      onChange={(e) => setOtherGuests(e.target.value)}
                      placeholder={fields.guests.otherPlaceholder}
                      className="field-input"
                    />
                  ) : null}
                </fieldset>

                <Field label={fields.meal.label} htmlFor="rsvp-meal">
                  <input
                    id="rsvp-meal"
                    name="meal"
                    maxLength={160}
                    placeholder={fields.meal.placeholder}
                    className="field-input"
                  />
                </Field>
              </>
            ) : null}

            <Field label={fields.message.label} htmlFor="rsvp-message">
              <textarea
                id="rsvp-message"
                name="message"
                maxLength={600}
                placeholder={fields.message.placeholder}
                className="field-input"
              />
            </Field>

            <div className="flex flex-col items-center gap-stack">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? rsvp.sending : rsvp.submit}
              </Button>
              <Caption>{rsvp.deadline}</Caption>
              {status === "error" ? (
                <p role="alert" className="text-small text-tone-accent">
                  {rsvp.errorNote}
                </p>
              ) : null}
            </div>
          </form>
        )}
          </div>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
