"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
  Upload,
  FileText,
  BarChart2,
  Database,
  Loader2,
  Eye,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ApiResponse {
  success: boolean;
  items: DocumentItem[];
}

interface DocumentItem {
  id: string;
  DocumentName: string;
  Sentiment: string;
  Entities: { Type: string; Text: string }[];
  ProcessedText: string;
}

interface FormattedDocument {
  id: string;
  name: string;
  status: string;
  sentiment: string;
  entities: number;
}

export default function MainContent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [documents, setDocuments] = useState<FormattedDocument[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    setUserId(storedUserId);
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/user/getHistory");
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data: ApiResponse = await response.json();
      const formattedDocuments = data.items.map(formatDocument);
      setDocuments(formattedDocuments);
    } catch (error) {
      console.error("Error fetching documents:", error);
      toast({
        title: "Error",
        description: "Failed to fetch documents. Please try again later.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDocument = (item: DocumentItem): FormattedDocument => ({
    id: item.id,
    name: item.DocumentName,
    status: "Processed",
    sentiment: item.Sentiment,
    entities: item.Entities.length,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile && userId) {
      setIsUploading(true);
      const fileName = `${userId}-${selectedFile.name}`;
      const formData = new FormData();
      formData.append("file", selectedFile, fileName);

      try {
        const response = await fetch("/api/user/uploadFile", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const newDocument: FormattedDocument = {
            id: String(Date.now()),
            name: fileName,
            status: "Processing",
            sentiment: "Analyzing",
            entities: 0,
          };
          setDocuments((prev) => [newDocument, ...prev]);
          toast({
            title: "File Uploaded",
            description:
              "Your file has been uploaded and is being processed. The results will be available shortly.",
            action: (
              <ToastAction altText="View documents">View documents</ToastAction>
            ),
          });
          setSelectedFile(null);
          const fileInput = document.getElementById(
            "file-upload"
          ) as HTMLInputElement;
          if (fileInput) fileInput.value = "";
          delayedRefresh(); // Call the new function here
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast({
          title: "Upload Failed",
          description:
            "There was an error uploading your file. Please try again.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const delayedRefresh = () => {
    setTimeout(() => {
      fetchDocuments();
    }, 15000); // 15 seconds delay
  };

  return (
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
              <Input id="file-upload" type="file" onChange={handleFileChange} />
              <Button
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </>
                )}
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
                <Eye className="h-8 w-8 mb-2" />
                <p>Human Review</p>
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
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : (
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
                      <TableCell className="font-medium">{doc.name}</TableCell>
                      <TableCell>{doc.status}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            doc.sentiment === "POSITIVE"
                              ? "bg-green-100 text-green-800"
                              : doc.sentiment === "NEGATIVE"
                              ? "bg-red-100 text-red-800"
                              : doc.sentiment === "NEUTRAL"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {doc.sentiment}
                        </span>
                      </TableCell>
                      <TableCell>{doc.entities}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
