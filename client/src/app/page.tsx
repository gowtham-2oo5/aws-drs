import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  FileText,
  Upload,
  Search,
  History,
  Database,
  Bot,
  Brain,
  CheckCircle,
  Zap,
  Globe,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <FileText className="h-6 w-6" />
          <span className="ml-2 text-lg font-bold">DocReview</span>
        </Link>
        <div className="ml-auto">
          <Link href="/login">
            <Button variant="ghost">Login</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full h-screen flex items-center justify-center py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Document Review System
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Streamline your document review process with our powerful,
                  AWS-backed system.
                </p>
              </div>
              <div className="space-x-4">
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Process Workflow
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
                  See how our AWS-powered services process your documents.
                </p>
              </div>
            </div>
            <div className="mx-auto mt-16 max-w-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* User Upload */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">User Upload</h3>
                  <p className="text-sm text-gray-500">
                    Document is uploaded by the user
                  </p>
                </div>

                {/* S3 Storage */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Database className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">S3 Storage</h3>
                  <p className="text-sm text-gray-500">
                    Document is securely stored in AWS S3
                  </p>
                </div>

                {/* Document Review */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Document Review</h3>
                  <p className="text-sm text-gray-500">
                    Reviewers provide feedback on the document
                  </p>
                </div>

                {/* Review Status */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Review Status</h3>
                  <p className="text-sm text-gray-500">
                    Track status: Pending, Reviewed, or Feedback Provided
                  </p>
                </div>

                {/* Notification */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Notification</h3>
                  <p className="text-sm text-gray-500">
                    Users are notified once their document is reviewed
                  </p>
                </div>

                {/* Admin Dashboard */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Admin Dashboard</h3>
                  <p className="text-sm text-gray-500">
                    Admins manage documents, reviewers, and feedback
                  </p>
                </div>
              </div>

              {/* API Gateway */}
              <div className="mt-12 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">API Gateway</h3>
                <p className="text-sm text-gray-500">
                  Securely delivers the final output to the user
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 DocReview. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
