"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, X, Upload } from "lucide-react";
import Link from "next/link";
import { ProjectFormData } from "@/types/projects";
import { SuccessMessage } from "./SuccessMessage";

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => Promise<void>;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    id: "",
    title: "",
    description: "",
    fullDescription: "",
    image: "",
    technologies: [""],
    features: [""],
    liveUrl: "",
    githubUrl: "",
    category: "web",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (
    index: number,
    value: string,
    field: "technologies" | "features"
  ) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const addArrayItem = (field: "technologies" | "features") => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  const removeArrayItem = (
    index: number,
    field: "technologies" | "features"
  ) => {
    if (formData[field].length > 1) {
      const newArray = [...formData[field]];
      newArray.splice(index, 1);
      setFormData({
        ...formData,
        [field]: newArray,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Generate a slug-like ID from the title if not provided
      let submissionData = { ...formData };
      if (!submissionData.id) {
        submissionData.id = formData.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, "")
          .replace(/\s+/g, "-");
      }

      // Filter out empty array items
      submissionData = {
        ...submissionData,
        technologies: submissionData.technologies.filter(
          (tech) => tech.trim() !== ""
        ),
        features: submissionData.features.filter(
          (feature) => feature.trim() !== ""
        ),
      };

      await onSubmit(submissionData);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting project:", err);
      setError("Failed to add project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      id: "",
      title: "",
      description: "",
      fullDescription: "",
      image: "",
      technologies: [""],
      features: [""],
      liveUrl: "",
      githubUrl: "",
      category: "web",
    });
  };

  if (isSubmitted) {
    return <SuccessMessage onAddAnother={resetForm} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-full px-0">
      {error && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center mb-6">
          <p className="text-destructive font-medium">{error}</p>
        </div>
      )}

      {/* Basic Information */}
      <div className="space-y-4 border rounded-lg p-5 bg-card/30 backdrop-blur-sm shadow-sm">
        <h2 className="text-xl font-serif font-semibold border-b pb-2">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Project Title <span className="text-destructive">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="My Awesome Project"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="id" className="text-sm font-medium">
              Project ID{" "}
              <span className="text-muted-foreground text-xs">(optional)</span>
            </label>
            <input
              id="id"
              name="id"
              type="text"
              value={formData.id}
              onChange={handleChange}
              placeholder="my-awesome-project"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
            <p className="text-xs text-muted-foreground">
              Will be generated from title if left empty
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Short Description <span className="text-destructive">*</span>
          </label>
          <input
            id="description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="A brief description of your project"
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="fullDescription" className="text-sm font-medium">
            Full Description <span className="text-destructive">*</span>
          </label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Detailed description of your project, including its purpose, challenges, and solutions"
            className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-sm font-medium">
            Category <span className="text-destructive">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
            <option value="design">Design</option>
          </select>
        </div>
      </div>

      {/* Technologies */}
      <div className="space-y-4 border rounded-lg p-5 bg-card/30 backdrop-blur-sm shadow-sm">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-serif font-semibold">Technologies</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => addArrayItem("technologies")}
            className="h-8 px-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-3">
          {formData.technologies.map((tech, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={tech}
                onChange={(e) =>
                  handleArrayChange(index, e.target.value, "technologies")
                }
                placeholder={`Technology ${index + 1}`}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(index, "technologies")}
                disabled={formData.technologies.length <= 1}
                className="h-9 w-9 rounded-md"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 border rounded-lg p-5 bg-card/30 backdrop-blur-sm shadow-sm">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-serif font-semibold">Features</h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => addArrayItem("features")}
            className="h-8 px-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add
          </Button>
        </div>

        <div className="space-y-3">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) =>
                  handleArrayChange(index, e.target.value, "features")
                }
                placeholder={`Feature ${index + 1}`}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeArrayItem(index, "features")}
                disabled={formData.features.length <= 1}
                className="h-9 w-9 rounded-md"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="space-y-4 border rounded-lg p-5 bg-card/30 backdrop-blur-sm shadow-sm">
        <h2 className="text-xl font-serif font-semibold border-b pb-2">
          Links
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="image" className="text-sm font-medium">
              Image URL <span className="text-destructive">*</span>
            </label>
            <div className="flex">
              <input
                id="image"
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
                className="flex h-9 w-full rounded-l-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
              <Button
                type="button"
                variant="secondary"
                className="rounded-l-none"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="liveUrl" className="text-sm font-medium">
              Live Demo URL
            </label>
            <input
              id="liveUrl"
              name="liveUrl"
              type="url"
              value={formData.liveUrl}
              onChange={handleChange}
              placeholder="https://myproject.com"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label htmlFor="githubUrl" className="text-sm font-medium">
              GitHub Repository URL
            </label>
            <input
              id="githubUrl"
              name="githubUrl"
              type="url"
              value={formData.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username/repo"
              className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 border-t flex flex-col sm:flex-row justify-end gap-3">
        <Button type="button" variant="outline" asChild>
          <Link href="/projects">Cancel</Link>
        </Button>
        <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
          {isSubmitting ? "Adding..." : "Add Project"}
        </Button>
      </div>
    </form>
  );
};
