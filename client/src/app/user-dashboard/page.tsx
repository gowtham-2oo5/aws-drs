"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Upload,
  FileText,
  BarChart2,
  Database,
  LogOut,
} from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Document1.pdf",
      status: "Processed",
      sentiment: "Positive",
      entities: 5,
    },
    {
      id: 2,
      name: "Document2.docx",
      status: "Processing",
      sentiment: "-",
      entities: "-",
    },
    {
      id: 3,
      name: "Document3.txt",
      status: "Failed",
      sentiment: "-",
      entities: "-",
    },
  ]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Simulating file upload and processing
      setDocuments((prev) => [
        {
          id: prev.length + 1,
          name: selectedFile.name,
          status: "Processing",
          sentiment: "-",
          entities: "-",
        },
        ...prev,
      ]);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Search className="h-6 w-6 mr-2" />
          <span className="font-bold">DocReviewGen</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" className="text-sm font-medium">
            Dashboard
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            Settings
          </Button>
          <Button variant="ghost" className="text-sm font-medium">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </nav>
      </header>
      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <Card>
            <CardHeader>
              <CardTitle>Upload New Document</CardTitle>
              <CardDescription>
                Upload a document to start the review process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
                <Button onClick={handleUpload} disabled={!selectedFile}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Document Processing Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 mb-2" />
                  <p>Upload to S3</p>
                </div>
                <div className="hidden md:block">→</div>
                <div className="flex flex-col items-center">
                  <FileText className="h-8 w-8 mb-2" />
                  <p>Textract OCR</p>
                </div>
                <div className="hidden md:block">→</div>
                <div className="flex flex-col items-center">
                  <BarChart2 className="h-8 w-8 mb-2" />
                  <p>Comprehend Analysis</p>
                </div>
                <div className="hidden md:block">→</div>
                <div className="flex flex-col items-center">
                  <Database className="h-8 w-8 mb-2" />
                  <p>Store in DynamoDB</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Your Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sentiment</TableHead>
                    <TableHead>Entities Detected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.status}</TableCell>
                      <TableCell>{doc.sentiment}</TableCell>
                      <TableCell>{doc.entities}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 Document Review Generator. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
