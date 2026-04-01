import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Bot, CheckCircle2, Clock3, Code2, FileText, Sparkles, Wand2 } from 'lucide-react';
import { jsPDF } from 'jspdf';

import data from '@/data.json';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

type RequirementDraft = {
  summary: string;
  scopeChecklist: string[];
  timelineDraft: string[];
  notes: string[];
};

interface RequirementAssistantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const buildRequirementDraft = (brief: string): RequirementDraft => {
  const normalizedText = brief.trim().toLowerCase();

  const scopeRules = [
    { keywords: ['ecommerce', 'cart', 'product', 'checkout', 'order'], checklist: 'E-commerce flow: catalog, cart, checkout, and order lifecycle' },
    { keywords: ['booking', 'appointment', 'slot', 'schedule'], checklist: 'Booking engine: availability, booking flow, and confirmations' },
    { keywords: ['dashboard', 'analytics', 'report', 'kpi'], checklist: 'Analytics dashboard with role-based reports and KPI snapshots' },
    { keywords: ['admin', 'cms', 'manage', 'panel'], checklist: 'Admin/CMS module for content and operations management' },
    { keywords: ['mobile', 'android', 'ios', 'app'], checklist: 'Mobile companion scope for iOS and Android users' },
    { keywords: ['payment', 'bkash', 'nagad', 'sslcommerz'], checklist: 'Payment integration planning with local BD gateways' },
    { keywords: ['auth', 'login', 'otp', 'role', 'permission'], checklist: 'Secure authentication with user roles and access control' },
    { keywords: ['seo', 'speed', 'performance', 'rank'], checklist: 'Technical SEO and performance optimization baseline' },
    { keywords: ['api', 'integration', 'crm', 'erp', 'whatsapp'], checklist: 'Third-party integration map across APIs and communication channels' },
  ];

  const matchedChecklist = scopeRules
    .filter((rule) => rule.keywords.some((keyword) => normalizedText.includes(keyword)))
    .map((rule) => rule.checklist);

  if (matchedChecklist.length === 0) {
    matchedChecklist.push(
      'Core business scope: branding-aligned UI, responsive pages, and conversion-focused journeys',
      'Technical scope: secure architecture, deployment pipeline, and maintenance readiness',
    );
  }

  const urgencyScore = ['asap', 'urgent', 'rush', 'immediately'].some((word) => normalizedText.includes(word)) ? 1 : 0;
  const complexityScore = matchedChecklist.length + (normalizedText.length > 500 ? 1 : 0);

  let timelineBand = '6-8 weeks';
  if (urgencyScore > 0) {
    timelineBand = '3-5 weeks (priority delivery)';
  } else if (complexityScore >= 6) {
    timelineBand = '10-14 weeks';
  } else if (complexityScore >= 4) {
    timelineBand = '8-10 weeks';
  }

  const timelineDraft = [
    'Discovery and scope workshop: Week 1',
    'UI/UX and architecture blueprint: Weeks 2-3',
    `Core development and integrations: Weeks 4-${urgencyScore > 0 ? '4' : '7'}`,
    'QA, security checks, and launch prep: Final 1-2 weeks',
    `Estimated total timeline: ${timelineBand}`,
  ];

  const notes = [
    'This draft is generated from your text and should be reviewed in a requirement workshop.',
    'Priority delivery can shorten the timeline but may require faster stakeholder decisions.',
  ];

  return {
    summary: matchedChecklist.length > 2 ? 'Structured delivery draft prepared.' : 'Quick draft prepared from your brief.',
    scopeChecklist: matchedChecklist,
    timelineDraft,
    notes,
  };
};

const RequirementAssistantDialog = ({ open, onOpenChange }: RequirementAssistantDialogProps) => {
  const [brief, setBrief] = useState('');
  const [draft, setDraft] = useState<RequirementDraft | null>(null);
  const [stage, setStage] = useState<'input' | 'result'>('input');

  useEffect(() => {
    if (!open) {
      setBrief('');
      setDraft(null);
      setStage('input');
    }
  }, [open]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setBrief('');
      setDraft(null);
      setStage('input');
    }

    onOpenChange(nextOpen);
  };

  const generateDraft = () => {
    if (!brief.trim()) {
      return;
    }

    setDraft(buildRequirementDraft(brief));
    setStage('result');
  };

  const downloadPdf = () => {
    if (!draft) {
      return;
    }

    const pdf = new jsPDF({ unit: 'pt', format: 'a4' });
    const margin = 40;
    let cursorY = 54;

    const addWrappedLines = (lines: string[], indent = 0) => {
      lines.forEach((line) => {
        const wrapped = pdf.splitTextToSize(line, 515 - indent);
        wrapped.forEach((row: string) => {
          if (cursorY > 760) {
            pdf.addPage();
            cursorY = 54;
          }
          pdf.text(row, margin + indent, cursorY);
          cursorY += 16;
        });
      });
    };

    pdf.setFillColor(30, 64, 175);
    pdf.rect(0, 0, 595, 86, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(22);
    pdf.text('AI Requirement Draft', margin, 38);
    pdf.setFontSize(11);
    pdf.text(`${data.site.name} support export`, margin, 61);

    pdf.setTextColor(15, 23, 42);
    cursorY = 118;

    pdf.setFontSize(14);
    pdf.text('Project Brief', margin, cursorY);
    cursorY += 20;
    pdf.setFontSize(11);
    addWrappedLines([brief.trim() || 'No brief provided.']);

    cursorY += 10;
    pdf.setFontSize(14);
    pdf.text('Scope Checklist', margin, cursorY);
    cursorY += 20;
    pdf.setFontSize(11);
    addWrappedLines(draft.scopeChecklist.map((item) => `- ${item}`), 12);

    cursorY += 10;
    pdf.setFontSize(14);
    pdf.text('Timeline Draft', margin, cursorY);
    cursorY += 20;
    pdf.setFontSize(11);
    addWrappedLines(draft.timelineDraft.map((item) => `- ${item}`), 12);

    cursorY += 10;
    pdf.setFontSize(14);
    pdf.text('Notes', margin, cursorY);
    cursorY += 20;
    pdf.setFontSize(11);
    addWrappedLines(draft.notes.map((item) => `- ${item}`), 12);

    pdf.save('ai-requirement-draft.pdf');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[90vw] max-w-2xl max-h-[82vh] border border-white/10 bg-[#020617]/95 text-slate-100 shadow-2xl overflow-hidden rounded-3xl p-4 md:p-5 flex flex-col">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_28%)]" />

        <div className="relative z-10 flex flex-col min-h-0 flex-1">
          <DialogHeader className="text-left pr-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-blue-300 w-fit">
              <Sparkles size={12} /> Support Tool
            </div>
            <DialogTitle className="text-xl md:text-2xl font-black text-white">AI Requirement Assistant</DialogTitle>
            <DialogDescription className="text-slate-400 text-sm">
              Paste your project brief here. You will get a compact PDF draft with scope, timeline, and notes.
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {stage === 'input' ? (
              <motion.div
                key="input"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="mt-4 space-y-4 overflow-y-auto pr-1 flex-1 min-h-0"
              >
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3.5 shadow-inner shadow-black/20">
                  <Textarea
                    value={brief}
                    onChange={(event) => setBrief(event.target.value)}
                    placeholder="Example: We need an e-commerce site for Bangladesh with bKash payment, admin panel, analytics, and mobile app support."
                    className="min-h-[130px] resize-none border-white/10 bg-slate-950/40 text-white placeholder:text-slate-500 focus-visible:ring-blue-500/50"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={generateDraft}
                    disabled={!brief.trim()}
                    className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                  >
                    <Wand2 size={16} /> Generate Draft
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setBrief('')}
                    className="border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    Clear
                  </Button>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-sm text-slate-400">
                  Keep it short if you want a faster draft. The PDF will highlight scope, timeline, and notes.
                </div>
              </motion.div>
            ) : draft ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="mt-4 space-y-3 overflow-y-auto pr-1 flex-1 min-h-0 max-h-[58vh]"
              >
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-emerald-200 text-sm flex items-start gap-3">
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                  <span>{draft.summary}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3.5">
                    <h4 className="mb-3 flex items-center gap-2 text-white font-bold"><FileText size={16} className="text-blue-400" /> Scope Checklist</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {draft.scopeChecklist.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-3.5">
                    <h4 className="mb-3 flex items-center gap-2 text-white font-bold"><Clock3 size={16} className="text-blue-400" /> Timeline Draft</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {draft.timelineDraft.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Clock3 size={16} className="mt-0.5 shrink-0 text-blue-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h4 className="flex items-center gap-2 text-white font-bold"><Code2 size={16} className="text-purple-400" /> Draft Code</h4>
                    <Button
                      variant="outline"
                      onClick={downloadPdf}
                      className="border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white self-start"
                    >
                      <FileText size={16} /> Download PDF
                    </Button>
                  </div>
                  <pre className="max-h-52 overflow-auto rounded-2xl bg-black/30 p-3 text-xs leading-5 text-slate-200 border border-white/5 whitespace-pre-wrap">
                    {draft.codeSnippet}
                  </pre>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                  <h4 className="mb-3 flex items-center gap-2 text-white font-bold"><Sparkles size={16} className="text-blue-400" /> Next Notes</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {draft.notes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Bot size={15} className="mt-0.5 shrink-0 text-blue-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <Button
                    variant="outline"
                    onClick={() => setStage('input')}
                    className="border-white/10 bg-white/5 text-slate-200 hover:bg-white/10 hover:text-white"
                  >
                    <ArrowLeft size={16} /> Back to Edit
                  </Button>
                  <Button
                    onClick={downloadPdf}
                    className="bg-blue-600 hover:bg-blue-500 text-white"
                  >
                    Download PDF
                  </Button>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequirementAssistantDialog;