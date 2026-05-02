"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  assessmentQuestions,
  getQuestionById,
  getRecommendedSpecialtyIds,
} from "@/lib/assessment-data";
import { specialties } from "@/lib/seed-data";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Answer = { questionId: string; value: string };

export default function AssessmentPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = getQuestionById(currentQuestionId);

  function handleNext() {
    if (!selectedValue || !currentQuestion) return;

    const newAnswers = [
      ...answers,
      { questionId: currentQuestionId, value: selectedValue },
    ];
    setAnswers(newAnswers);

    const selectedOption = currentQuestion.options.find(
      (o) => o.value === selectedValue,
    );
    if (selectedOption?.nextQuestionId) {
      setCurrentQuestionId(selectedOption.nextQuestionId);
      setSelectedValue(null);
    } else {
      setFinished(true);
      const specialtyIds = getRecommendedSpecialtyIds(newAnswers);
      const params = new URLSearchParams();
      params.set("specialties", specialtyIds.join(","));
      router.push(`/assessment/results?${params.toString()}`);
    }
  }

  function handleBack() {
    if (answers.length === 0) return;
    const prev = answers[answers.length - 1];
    setCurrentQuestionId(prev.questionId);
    setSelectedValue(prev.value);
    setAnswers(answers.slice(0, -1));
  }

  if (!currentQuestion || finished) {
    return (
      <>
        <Header />
        <main className="flex-1 flex items-center justify-center py-20 px-6">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  const totalQuestions = assessmentQuestions.length;
  const progress = ((answers.length + 1) / 3) * 100; // ~3 questions per path

  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-6">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h1 className="font-heading text-2xl md:text-3xl font-bold uppercase tracking-wider mb-2">
              Legal Needs Assessment
            </h1>
            <p className="text-muted-foreground">
              Step {answers.length + 1} — Answer a few questions so we can
              understand your needs.
            </p>
            <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          <Card>
            <CardContent className="pt-8 pb-6">
              <h2 className="font-heading text-xl font-semibold mb-6">
                {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedValue(option.value)}
                    className={`w-full text-left px-4 py-3 rounded-md border transition-colors ${
                      selectedValue === option.value
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:border-primary/50 text-foreground/80"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex justify-between">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={answers.length === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext} disabled={!selectedValue}>
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
