import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function Features() {
  return (
    <section className="max-w-screen-2xl mx-auto">
      <div>
        <div className="flex flex-col items-center justify-center gap-4">
          <Badge className="rounded-full" variant={"secondary"}>Features</Badge>
          <h1 className="font-bold text-4xl">AI Agents for Smoother Customer Experiences</h1>
          <p className="text-muted-foreground">A complete platform for building & deploying AI support agents for your business</p>
        </div>
        <div>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <Card className="bg-muted/50">
              <CardHeader>
                <h2 className="text-xl font-semibold">Customizable Chatbots</h2>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-secondary-foreground">Easily create and customize chatbots tailored to your business needs.</p>
              </CardContent>
            </Card>
            <Card  className="bg-muted/50">
              <CardHeader>
                <h2 className="text-xl font-semibold">AI-Powered Responses</h2>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-secondary-foreground">Leverage advanced AI to provide accurate and timely responses.</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/50">
              <CardHeader>
                <h2 className="text-xl font-semibold">Analytics & Insights</h2>
              </CardHeader>
              <CardContent>
                <p className="mt-2 text-secondary-foreground">Gain valuable insights into customer interactions and improve service quality.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section >
  );

}