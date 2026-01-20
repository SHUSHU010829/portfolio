import { USER } from "@/features/portfolio/data/user";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="relative mx-auto min-h-screen max-w-3xl">
        <main className="relative">
          {/* Left vertical line */}
          <div className="absolute inset-y-0 left-0 w-px border-l border-border/30" />
          {/* Right vertical line */}
          <div className="absolute inset-y-0 right-0 w-px border-r border-border/30" />

          {/* Hero Section */}
          <section className="py-20">
            <div className="mx-auto max-w-3xl px-4 text-center">
              <h1 className="text-3xl font-bold">{USER.displayName}</h1>
              <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                {USER.description}
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="outline" asChild>
                  <a
                    href={USER.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GitHubLogoIcon className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
