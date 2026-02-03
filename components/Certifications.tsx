import { Award } from "lucide-react";

export default function Certifications() {
  const certifications = [
    {
      title: "AWS Certified Solutions Architect",
      date: "Issued: 2023 | Valid until: 2026",
      color: "primary",
    },
    {
      title: "Google Cloud Professional Developer",
      date: "Issued: 2022 | Valid until: 2025",
      color: "info",
    },
    {
      title: "MongoDB Certified Developer",
      date: "Issued: 2021",
      color: "warning",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-4">
      <h3 className="font-primary text-sm font-semibold text-primary">
        {"//"} Certifications
      </h3>
      <div className="flex flex-col gap-4">
        {certifications.map((cert, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 border border-border bg-card p-5"
          >
            <div
              className={`flex h-[48px] w-[48px] flex-shrink-0 items-center justify-center border ${
                cert.color === "primary"
                  ? "border-primary bg-secondary"
                  : cert.color === "info"
                    ? "border-color-info bg-secondary"
                    : "border-color-warning bg-secondary"
              }`}
            >
              <Award
                className={`h-[24px] w-[24px] ${
                  cert.color === "primary"
                    ? "text-primary"
                    : cert.color === "info"
                      ? "text-color-info"
                      : "text-color-warning"
                }`}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-primary text-sm font-semibold text-foreground md:text-base">
                {cert.title}
              </h4>
              <p className="font-secondary text-xs text-muted-foreground">
                {cert.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
