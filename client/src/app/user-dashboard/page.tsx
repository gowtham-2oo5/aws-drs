"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Upload, FileText } from "lucide-react"

export default function DocumentReviewPage() {
  const [review, setReview] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setProgress(0)

    // Simulating file upload and review generation with progress updates
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200))
      setProgress(i)
    }

    // Placeholder for API call to backend service
    // Replace this with actual API call to your backend
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating final processing
      setReview("This is a placeholder review for the uploaded document. Replace this with the actual review from your backend service.")
    } catch (error) {
      console.error("Error generating review:", error)
      setReview("An error occurred while generating the review.")
    } finally {
      setIsLoading(false)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen p-3 bg-background flex flex-col">
      <header className="border-b">
        <nav className="container py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">DocReview</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </header>

      <main className="flex-grow container py-10 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <Tabs defaultValue="upload" className="space-y-8">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="upload">Upload Document</TabsTrigger>
                <TabsTrigger value="history">Documents History</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="upload" className="space-y-8">
              <div className="flex flex-col items-center space-y-6">
                <label htmlFor="file-upload" className="w-full">
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,image/*"
                    disabled={isLoading}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-400 transition-colors">
                    <div className="space-y-2 text-center">
                      <Upload className="mx-auto h-16 w-16 text-gray-400" />
                      <div className="flex flex-col text-sm text-gray-600">
                        <span className="relative font-medium text-primary hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary">
                          Upload a file
                        </span>
                        <p>or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF or Image up to 10MB</p>
                    </div>
                  </div>
                </label>
                {isLoading && (
                  <div className="w-full max-w-md space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="animate-pulse">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Progress value={progress} className="w-full" />
                        <p className="text-sm text-muted-foreground">
                          {progress < 100 ? "Uploading and analyzing document..." : "Generating review..."}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {review && (
                <div className="rounded-lg border p-8 bg-card">
                  <h2 className="text-2xl font-semibold mb-6">Document Review:</h2>
                  <p className="text-card-foreground text-lg leading-relaxed">{review}</p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="history">
              <div className="text-center p-8 bg-card rounded-lg border">
                <h2 className="text-2xl font-semibold mb-6">Document History</h2>
                <p className="text-card-foreground text-lg">Your document history will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}