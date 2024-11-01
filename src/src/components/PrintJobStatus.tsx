import React from 'react';
import { RotateCcw, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { usePrintJobs } from '../hooks/usePrintJobs';

export default function PrintJobStatus() {
  const { jobs, resendJob, deleteJob } = usePrintJobs();

  if (!jobs.length) return null;

  return (
    <section className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="text-lg font-medium">Print Jobs</h3>
      </div>
      <div className="divide-y">
        {jobs.map((job) => (
          <div key={job.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {job.status === 'completed' ? (
                  <CheckCircle2 className="text-green-500" size={20} />
                ) : job.status === 'failed' ? (
                  <XCircle className="text-red-500" size={20} />
                ) : (
                  <RotateCcw className="text-blue-500 animate-spin" size={20} />
                )}
                <div>
                  <div className="font-medium">{job.filename}</div>
                  <div className="text-sm text-gray-500">
                    Printer: {job.printerName} • {new Date(job.timestamp).toLocaleString()}
                  </div>
                </div>
              </div>
              
              {job.status === 'failed' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => resendJob(job.id)}
                    className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50"
                    title="Resend"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => deleteJob(job.id)}
                    className="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
            
            {job.error && (
              <div className="mt-2 text-sm text-red-600">
                Error: {job.error}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}