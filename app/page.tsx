import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Create Engaging Polls in Minutes
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Gather feedback, make decisions, and engage your audience with beautiful, 
          interactive polls that are easy to create and share.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/register">Get Started Free</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything you need to create great polls
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From simple yes/no questions to complex multi-choice surveys, 
            Polly has all the features you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Easy to Create</CardTitle>
              <CardDescription>
                Build polls in minutes with our intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Drag-and-drop poll builder</li>
                <li>• Multiple question types</li>
                <li>• Custom styling options</li>
                <li>• Mobile-friendly design</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Real-time Results</CardTitle>
              <CardDescription>
                Watch responses come in live with instant analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Live vote tracking</li>
                <li>• Visual result charts</li>
                <li>• Export data options</li>
                <li>• Response filtering</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Share Anywhere</CardTitle>
              <CardDescription>
                Distribute your polls across all your channels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Social media integration</li>
                <li>• Email campaigns</li>
                <li>• Embed on websites</li>
                <li>• QR code generation</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to start polling?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust Polly for their polling needs.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/register">Start Creating Polls</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="text-lg font-semibold mb-2">Polly</div>
          <p className="text-gray-400 text-sm">
            © 2025 Polly. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
