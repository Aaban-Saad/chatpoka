"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Bot, Settings, FileText, User, Thermometer, Plus } from "lucide-react"

export function ChatbotCreator() {
  const [open, setOpen] = useState(false)
  const [temperature, setTemperature] = useState([0.7])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    systemPrompt: "",
    persona: "",
    files: null as FileList | null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Chatbot Configuration:", {
      ...formData,
      temperature: temperature[0],
      files: formData.files ? Array.from(formData.files).map((f) => f.name) : [],
    })
    // Here you would typically send the data to your backend
    setOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, files: e.target.files }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Create Custom Chatbot
          </DialogTitle>
          <DialogDescription>Configure your AI chatbot with custom settings and training data.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Settings className="h-4 w-4" />
                  <h3 className="font-semibold">Basic Information</h3>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="chatbot-name">Chatbot Name</Label>
                  <Input
                    id="chatbot-name"
                    placeholder="e.g., Customer Support Bot"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your chatbot's purpose and capabilities..."
                    value={formData.description}
                    onChange={(e: { target: { value: string } }) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Configuration */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4" />
                  <h3 className="font-semibold ">AI Configuration</h3>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="system-prompt">System Prompt</Label>
                  <Textarea
                    id="system-prompt"
                    placeholder="You are a helpful assistant that..."
                    value={formData.systemPrompt}
                    onChange={(e: { target: { value: string } }) => setFormData((prev) => ({ ...prev, systemPrompt: e.target.value }))}
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="persona">Persona</Label>
                  <Input
                    id="persona"
                    placeholder="e.g., Professional, Friendly, Technical Expert"
                    value={formData.persona}
                    onChange={(e) => setFormData((prev) => ({ ...prev, persona: e.target.value }))}
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    <Label htmlFor="temperature">Temperature: {temperature[0]}</Label>
                  </div>
                  <div className="px-2">
                    <Slider
                      id="temperature"
                      min={0}
                      max={2}
                      step={0.1}
                      value={temperature}
                      onValueChange={setTemperature}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs mt-1">
                      <span>More Focused</span>
                      <span>More Creative</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-4 w-4" />
                  <h3 className="font-semibold">Training Data</h3>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="file-upload">Upload Files</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Upload className="mx-auto h-8 w-8  mb-2" />
                    <div className="space-y-2">
                      <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".txt,.pdf,.doc,.docx,.csv"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <Label
                        htmlFor="file-upload"
                        className="cursor-pointer font-medium text-center flex items-center justify-center"
                      >
                        Choose files to upload
                      </Label>
                      <p className="text-sm text-gray-500">Supported formats: TXT, PDF, DOC, DOCX, CSV</p>
                      {formData.files && formData.files.length > 0 && (
                        <div className="mt-3 text-left">
                          <p className="text-sm font-medium text-gray-700 mb-1">Selected files:</p>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {Array.from(formData.files).map((file, index) => (
                              <li key={index} className="flex items-center gap-2">
                                <FileText className="h-3 w-3" />
                                {file.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className=""
            >
              Cancel
            </Button>
            <Button type="submit">
              Create Chatbot
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
