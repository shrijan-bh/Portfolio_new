"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<
    "checking" | "online" | "offline"
  >("checking");
  const [backendUrl, setBackendUrl] = useState("http://localhost:5000");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUrl = localStorage.getItem("backend_url");
    if (savedUrl) setBackendUrl(savedUrl);

    checkBackendStatus();
    const interval = setInterval(checkBackendStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkBackendStatus = async () => {
    try {
      const url =
        localStorage.getItem("backend_url") || "http://localhost:5000";
      const response = await fetch(`${url}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setBackendStatus(response.ok ? "online" : "offline");
    } catch {
      setBackendStatus("offline");
    }
  };

  const handleUpdateBackendUrl = (newUrl: string) => {
    localStorage.setItem("backend_url", newUrl);
    setBackendUrl(newUrl);
    setShowUrlInput(false);
    checkBackendStatus();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (backendStatus === "offline") {
        setError("Backend is offline. Start the Python server to login.");
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem("admin_token", data.token);
        setUsername("");
        setPassword("");
      } else {
        setError(data.message || "Login failed");
      }
    } catch {
      setError("Cannot connect to backend. Verify the server URL is correct.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_token");
  };

  if (isAuthenticated) {
    return (
      <AdminDashboard
        onLogout={handleLogout}
        backendStatus={backendStatus}
        backendUrl={backendUrl}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full glass border border-primary/30 rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Access
          </h1>
          <p className="text-muted-foreground">Secret Login Portal</p>
        </div>

        {/* Backend Status and URL */}
        <div className="mb-6 space-y-3">
          <div className="p-3 rounded-lg bg-background/50 border border-primary/20">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    backendStatus === "online" ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm text-muted-foreground">
                  Backend:{" "}
                  <span
                    className={
                      backendStatus === "online"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {backendStatus.toUpperCase()}
                  </span>
                </span>
              </div>
              <button
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-3 py-1 text-xs bg-primary/20 text-primary hover:bg-primary/30 rounded transition-all duration-200 font-medium"
              >
                {showUrlInput ? "Hide" : "Edit"}
              </button>
            </div>
          </div>

          {showUrlInput && (
            <div className="space-y-2 animate-in fade-in">
              <input
                type="text"
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                placeholder="https://your-backend.com"
                className="w-full px-3 py-2 bg-card border border-primary/20 rounded text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdateBackendUrl(backendUrl)}
                  className="flex-1 px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-all"
                >
                  Save URL
                </button>
                <button
                  onClick={() => setShowUrlInput(false)}
                  className="flex-1 px-3 py-1 bg-background/50 border border-primary/20 text-foreground rounded text-sm hover:bg-background transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-2 bg-card border border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-card border border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary/50"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || backendStatus === "offline"}
            className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 p-4 bg-background/50 border border-accent/20 rounded-lg text-xs text-muted-foreground">
          <p className="font-semibold mb-2 text-foreground">Setup:</p>
          <ol className="space-y-1 list-decimal list-inside">
            <li>Run backend or connect to hosted server</li>
            <li>Click Edit to change backend URL</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard({
  onLogout,
  backendStatus,
  backendUrl,
}: {
  onLogout: () => void;
  backendStatus: string;
  backendUrl: string;
}) {
  const [imageFiles, setImageFiles] = useState<any[]>([]);
  const [documentFiles, setDocumentFiles] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (backendStatus === "online") {
      fetchFiles();
    }
  }, [backendStatus]);

  const fetchFiles = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${backendUrl}/files`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setImageFiles(data.folders?.images || []);
        setDocumentFiles(data.folders?.documents || []);
      }
    } catch {
      console.log("Could not fetch files - backend offline");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.currentTarget.files;
    if (!fileList) return;

    setUploading(true);
    setUploadMessage("");

    try {
      if (backendStatus === "offline") {
        setUploadMessage("Backend is offline. Files cannot be uploaded.");
        setUploading(false);
        return;
      }

      const formData = new FormData();
      for (let i = 0; i < fileList.length; i++) {
        formData.append("files", fileList[i]);
      }

      const token = localStorage.getItem("admin_token");
      const response = await fetch(`${backendUrl}/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (response.ok) {
        setUploadMessage("Files uploaded successfully!");
        fetchFiles();
        e.currentTarget.value = "";
      } else {
        setUploadMessage("Upload failed");
      }
    } catch {
      setUploadMessage("Cannot upload - backend is offline");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadFile = async (
    filename: string,
    category: "images" | "documents"
  ) => {
    try {
      setDownloading(filename);
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${backendUrl}/download/${category}/${encodeURIComponent(filename)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        alert("Download failed");
      }
    } catch (error) {
      alert("Cannot download file - backend is offline");
    } finally {
      setDownloading(null);
    }
  };

  const handleDeleteFile = async (
    filename: string,
    category: "images" | "documents"
  ) => {
    if (!confirm(`Delete ${filename}?`)) return;

    try {
      setDeleting(filename);
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `${backendUrl}/delete/${category}/${encodeURIComponent(filename)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.ok) {
        fetchFiles();
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      alert("Cannot delete file - backend is offline");
    } finally {
      setDeleting(null);
    }
  };

  const getFilePreview = (file: any, category: "images" | "documents") => {
    const filename = typeof file === "string" ? file : file.filename;
    const ext = filename.split(".").pop()?.toLowerCase();
    const token = localStorage.getItem("admin_token");

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext || "")) {
      return (
        <img
          src={`${backendUrl}/download/${category}/${encodeURIComponent(
            filename
          )}`}
          alt={filename}
          className="w-full h-40 object-cover rounded"
          onError={(e) => {
            e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpath d='M3 15l5-5 4 4 7-7' stroke='currentColor' strokeWidth='2'/%3E%3C/svg%3E`;
          }}
        />
      );
    } else if (["pdf"].includes(ext || "")) {
      return (
        <div className="w-full h-40 bg-red-500/20 rounded flex items-center justify-center">
          <span className="text-sm font-bold text-red-400">PDF</span>
        </div>
      );
    } else if (["doc", "docx"].includes(ext || "")) {
      return (
        <div className="w-full h-40 bg-blue-500/20 rounded flex items-center justify-center">
          <span className="text-sm font-bold text-blue-400">DOC</span>
        </div>
      );
    } else if (["txt"].includes(ext || "")) {
      return (
        <div className="w-full h-40 bg-yellow-500/20 rounded flex items-center justify-center">
          <span className="text-sm font-bold text-yellow-400">TXT</span>
        </div>
      );
    }

    return (
      <div className="w-full h-40 bg-primary/20 rounded flex items-center justify-center">
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  };

  const renderFileList = (
    files: any[],
    category: "images" | "documents",
    title: string
  ) => {
    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-4 capitalize">
          {title} ({files.length})
        </h3>
        {files.length === 0 ? (
          <p className="text-muted-foreground">
            No {title.toLowerCase()} uploaded yet
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {files.map((file, idx) => {
              const filename = typeof file === "string" ? file : file.filename;

              return (
                <div key={idx} className="flex flex-col items-center">
                  <div className="w-full bg-card/50 border border-primary/10 rounded-lg overflow-hidden hover:border-primary/30 transition-all duration-200 flex flex-col">
                    <div className="w-full">
                      {getFilePreview(file, category)}
                    </div>
                    <div className="p-3 flex flex-col gap-2 flex-1">
                      <p
                        className="text-foreground font-medium text-center text-xs break-words line-clamp-2"
                        title={filename}
                      >
                        {filename}
                      </p>
                      <div className="flex gap-2 justify-center pt-2 border-t border-primary/10">
                        <button
                          onClick={() => handleDownloadFile(filename, category)}
                          disabled={downloading === filename}
                          className="flex-1 px-2 py-1.5 hover:bg-primary/20 text-primary text-xs font-medium rounded transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1"
                          title="Download file"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          {downloading === filename ? "..." : "Download"}
                        </button>
                        <button
                          onClick={() => handleDeleteFile(filename, category)}
                          disabled={deleting === filename}
                          className="flex-1 px-2 py-1.5 hover:bg-red-500/20 text-red-400 text-xs font-medium rounded transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-1"
                          title="Delete file"
                        >
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          {deleting === filename ? "..." : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Admin Dashboard
            </h1>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  backendStatus === "online" ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
              <span className="text-sm text-muted-foreground">
                Backend: {backendStatus.toUpperCase()}
              </span>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        <div className="glass border border-primary/30 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Upload Files
          </h2>
          <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-all">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={uploading || backendStatus === "offline"}
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer block">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-foreground font-semibold mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-muted-foreground text-sm">
                Photos and documents (PDF, DOC, DOCX)
              </p>
            </label>
          </div>

          {uploadMessage && (
            <div
              className={`mt-4 p-3 rounded-lg text-sm ${
                uploadMessage.includes("success")
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {uploadMessage}
            </div>
          )}
        </div>

        <div className="glass border border-primary/30 rounded-lg p-8">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Uploaded Files
          </h2>
          {renderFileList(imageFiles, "images", "Images")}
          {renderFileList(documentFiles, "documents", "Documents")}
        </div>
      </div>
    </div>
  );
}
