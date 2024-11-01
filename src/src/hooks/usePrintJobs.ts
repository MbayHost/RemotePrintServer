import { useState, useEffect } from 'react';

interface PrintJob {
  id: string;
  filename: string;
  printerName: string;
  status: 'pending' | 'printing' | 'completed' | 'failed';
  timestamp: string;
  error?: string;
}

export function usePrintJobs() {
  const [jobs, setJobs] = useState<PrintJob[]>([
    {
      id: '1',
      filename: 'Document1.pdf',
      printerName: 'HP LaserJet Pro',
      status: 'completed',
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      filename: 'Invoice.pdf',
      printerName: 'Brother MFC',
      status: 'failed',
      timestamp: new Date().toISOString(),
      error: 'Printer offline'
    },
    {
      id: '3',
      filename: 'Report.docx',
      printerName: 'Canon PIXMA',
      status: 'printing',
      timestamp: new Date().toISOString()
    }
  ]);

  const resendJob = (jobId: string) => {
    setJobs(currentJobs =>
      currentJobs.map(job =>
        job.id === jobId
          ? { ...job, status: 'pending', error: undefined }
          : job
      )
    );
  };

  const deleteJob = (jobId: string) => {
    setJobs(currentJobs => currentJobs.filter(job => job.id !== jobId));
  };

  return {
    jobs,
    resendJob,
    deleteJob
  };
}