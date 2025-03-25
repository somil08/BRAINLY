import { useState, useEffect } from "react";
import { Button } from "../components/Button";
import { ShareIcon } from "../icons/ShareIcon";
import { PlusIcon } from "../icons/PlusIcon";
import { Card } from "../components/Card";
import { Sidebar } from "../components/Sidebar";
import "../App.css";
import { CreateComponent } from "../components/CreateComonent";
import { useContent } from "../hooks/useContent";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, [modalOpen]);

  // Logout Functionality
  function handleLogout() {
    localStorage.removeItem("token"); // Clear JWT token
    navigate("/signin"); // Redirect to Signin Page
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar - Fixed width to prevent overlapping */}
      <div className="w-64">
        <Sidebar />
      </div>

      {/* Main Content - Ensure Scrolling Works */}
      <div className="flex-1 p-6 min-h-screen bg-gray-100 overflow-y-auto">
        {/* Modal for Creating Content */}
        <CreateComponent
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        {/* Header with Buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex gap-4">
          <Button
  onClick={() => navigate("/chat")}
  variant="secondary"
  text="Chat Room"
/>

            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
            <Button variant="secondary" text="Share" startIcon={<ShareIcon />} />
            <Button
              onClick={handleLogout}
              variant="danger"
              text="Logout"
              fullwidth={false}
            />
          </div>
        </div>

        {/* Content Cards - Now Scrollable */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map(({ type, link, title }) => (
            <Card key={link} type={type} link={link} title={title} />
          ))}
        </div>

        {/* No Content Message */}
        {contents.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No content available. Add some!</p>
        )}
      </div>
    </div>
  );
}