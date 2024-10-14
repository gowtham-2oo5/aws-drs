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
        <section className="w-full h-screen flex items-center justify-center py-12 md:py-24 lg:py-32 bg-gray-100 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 items-center">
              <div className="flex flex-col justify-center space-y-8 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    How It Works
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400 mx-auto">
                    Our document review system simplifies your workflow in three
                    easy steps.
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <Upload className="h-10 w-10 mb-2" />
                    <CardTitle>1. Upload Document</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Simply upload any type of document to our secure platform.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Search className="h-10 w-10 mb-2" />
                    <CardTitle>2. AI-Powered Review</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Our AWS-backed AI analyzes the content and generates a
                      comprehensive review.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <History className="h-10 w-10 mb-2" />
                    <CardTitle>3. Access History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-500">
                      Easily access your document history and generated reviews
                      at any time.
                    </p>
                  </CardContent>
                </Card>
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
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">User Upload</h3>
                  <p className="text-sm text-gray-500">
                    Document is uploaded by the user
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Database className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">S3 Storage</h3>
                  <p className="text-sm text-gray-500">
                    Document is securely stored in AWS S3
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">AWS Textract</h3>
                  <p className="text-sm text-gray-500">
                    Extracts text and data from the document
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Amazon Comprehend</h3>
                  <p className="text-sm text-gray-500">
                    Analyzes the extracted text for insights
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Amazon A2I</h3>
                  <p className="text-sm text-gray-500">
                    Reviews and improves the analysis results
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-4">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold mb-2">Lambda Function</h3>
                  <p className="text-sm text-gray-500">
                    Processes the final output
                  </p>
                </div>
              </div>
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
