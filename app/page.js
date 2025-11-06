import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Wallet,
  ShieldCheck,
  Zap,
  Banknote,
  Megaphone,
  ArrowRight,
} from "lucide-react"; // Import icons

// A component for the feature cards to keep code clean
const FeatureCard = ({ icon: Icon, title, children }) => (
  <Card className="glass-card p-6 flex flex-col items-start text-left group hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
    <div className="p-2 bg-secondary rounded-lg mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
    <CardContent className="p-0 text-muted-foreground">
      {children}
    </CardContent>
  </Card>
);

// A component for the feature cards WITH progress bars
const FeatureCardWithBar = ({ icon: Icon, title, children }) => (
  <Card className="glass-card p-6 flex flex-col items-start text-left group hover:border-primary/50 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
    <div className="p-2 bg-secondary rounded-lg mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
    <CardContent className="p-0 text-muted-foreground space-y-3">
      <p>{children}</p>
      <div className="w-3/4">
        <div className="gradient-bar" />
      </div>
    </CardContent>
  </Card>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-8">
      {/* Hero Section */}
      <section className="hero-gradient-bg w-full max-w-7xl mx-auto py-20 lg:py-32 flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <p className="text-lg font-semibold text-primary mb-2">FinSight</p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            <span className="text-gradient">Test-Tritle Tratbring-Tigt</span>
            <br />
            <span className="text-foreground">Your Financial Command Center</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Gain clarity and control over your money with FinSight. Effortlessly
            track expenses, manage budgets, and achieve your financial goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="px-8 py-6 text-lg">
              <Link href="/dashboard">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 py-6 text-lg bg-transparent hover:bg-secondary"
            >
              <Link href="/features">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section (2-Column) */}
      <section className="w-full max-w-7xl mx-auto py-16 md:py-24">
        <p className="text-base text-muted-foreground text-center mb-2">
          FeaturesSection
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column (Text & 2 Cards) */}
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gradient leading-tight">
              Simpliife Your Finances
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage your finances in one place. Stop
              guessing, start knowing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCardWithBar icon={Wallet} title="Smart Budgeting">
                Set all income budgets and track progress to keep spending in line.
              </FeatureCardWithBar>
              <FeatureCardWithBar icon={Banknote} title="Detailo Transactions">
                Asternate twist log track 1 and detox their finimisme ease with.
              </FeatureCardWithBar>
                </div>
              </div>

          {/* Right Column (4 Cards Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard icon={LineChart} title="Intulilive Dashboard">
              Set all income budgets! track espote to mit usanfiy.
            </FeatureCard>
            <FeatureCard icon={ShieldCheck} title="Smart Bedeltan">
              Yet all income butpetes and betary/lace ecurity.
            </FeatureCard>
            <FeatureCard icon={Zap} title="Detailed Reporting">
              Mexiconconta mntl mer 2 fgt tes gray-400.
            </FeatureCard>
            <FeatureCard icon={Megaphone} title="Recount Transactions">
              Join thousande rut 6 naw 1 1 gtl ban. gray-400
            </FeatureCard>
          </div>
        </div>
      </section>  

      {/* Call to Action Section */}
      <section className="w-full py-16 md:py-24 text-center glass-card max-w-5xl mx-auto my-12 p-8 md:p-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
          Ready to take control? sm 44
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Join thousands already managing their money with FinSight.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild className="px-8 py-6 text-lg animate-pulse">
            <Link href="/auth/register">Start for Free</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="px-8 py-6 text-lg bg-transparent hover:bg-secondary"
          >
            <Link href="/contact">
              Contact Sales <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}