import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import * as docx from "docx";
import { saveAs } from "file-saver";
import "./Simplef.css";

const App = () => {
  const [activeTab, setActiveTab] = useState("basic-info");

  // Store data for different forms
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    position: "",
    experience: "",
    school: "",
    educationPosition: "",
    years: "",
    achievementTitle: "",
    achievementDescription: "",
    achievementYear: "",
    projectTitle: "",
    projectDescription: "",
    projectYear: "",
    summary: "",
    additionalInfoTitle: "",
    additionalInfo: "",
    skills: "",
  });

  // Handle tab switching
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e, tab) => {
    e.preventDefault();
    console.log(`${tab} submitted:`, formData);
    alert(`${tab} information saved!`);
  };

  // Generate PDF
  const generatePDF = () => {
    const input = document.getElementById("printContent");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save("resume.pdf");
    });
  };

  // Generate DOCX
  const generateDOCX = async () => {
    const { Document, Paragraph, TextRun, HeadingLevel, Packer } = docx;

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: formData.name,
              heading: HeadingLevel.HEADING_1,
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Email: ${formData.email}`,
                  bold: true,
                }),
              ],
            }),
            new Paragraph(`Phone: ${formData.phone}`),
            new Paragraph(`Address: ${formData.address}`),
            new Paragraph({
              text: "Work Experience",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400 },
            }),
            new Paragraph(`Company: ${formData.company}`),
            new Paragraph(`Position: ${formData.position}`),
            new Paragraph(`Experience: ${formData.experience} years`),
            new Paragraph({
              text: "Education",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400 },
            }),
            new Paragraph(`School: ${formData.school}`),
            new Paragraph(`Qualification: ${formData.educationPosition}`),
            new Paragraph(`Year: ${formData.years}`),
            new Paragraph({
              text: "Skills",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400 },
            }),
            new Paragraph(formData.skills),
            new Paragraph({
              text: "Summary",
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 400 },
            }),
            new Paragraph(formData.summary),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "resume.docx");
  };

  // Render the form based on the active tab
  const renderForm = (tab) => {
    switch (tab) {
      case "basic-info":
        return (
          <form onSubmit={(e) => handleSubmit(e, "Basic Info")}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Information
            </button>
          </form>
        );

      case "work-experience":
        return (
          <form onSubmit={(e) => handleSubmit(e, "Work Experience")}>
            <div className="mb-3">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                className="form-control"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Position</label>
              <input
                type="text"
                className="form-control"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter your position"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Years of Experience</label>
              <input
                type="text"
                className="form-control"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Enter number of years"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Information
            </button>
          </form>
        );

      case "projects":
        return (
          <form onSubmit={(e) => handleSubmit(e, "Projects")}>
            <div className="mb-3">
              <label className="form-label">Project Title</label>
              <input
                type="text"
                className="form-control"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleChange}
                placeholder="Enter project title"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Project Description</label>
              <textarea
                className="form-control"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Enter project description"
                required
                rows="4"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Project Year</label>
              <input
                type="text"
                className="form-control"
                name="projectYear"
                value={formData.projectYear}
                onChange={handleChange}
                placeholder="Enter project year"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Information
            </button>
          </form>
        );

      case "achievements":
        return (
          <form onSubmit={(e) => handleSubmit(e, "Achievements")}>
            <div className="mb-3">
              <label className="form-label">Achievement Title</label>
              <input
                type="text"
                className="form-control"
                name="achievementTitle"
                value={formData.achievementTitle}
                onChange={handleChange}
                placeholder="Enter achievement title"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Achievement Description</label>
              <textarea
                className="form-control"
                name="achievementDescription"
                value={formData.achievementDescription}
                onChange={handleChange}
                placeholder="Enter achievement description"
                required
                rows="4"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Achievement Year</label>
              <input
                type="text"
                className="form-control"
                name="achievementYear"
                value={formData.achievementYear}
                onChange={handleChange}
                placeholder="Enter achievement year"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Information
            </button>
          </form>
        );

      case "summary":
        return (
          <form onSubmit={(e) => handleSubmit(e, "Summary")}>
            <div className="mb-3">
              <label className="form-label">Professional Summary</label>
              <textarea
                className="form-control"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Enter a short summary about yourself"
                required
                rows="6"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Skills</label>
              <textarea
                className="form-control"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="Enter your skills (comma separated)"
                required
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Information
            </button>
          </form>
        );

      case "other":
        return (
          <form onSubmit={(e) => handleSubmit(e, "Other Information")}>
            <div className="mb-3">
              <label className="form-label">Additional Info Title</label>
              <input
                type="text"
                className="form-control"
                name="additionalInfoTitle"
                value={formData.additionalInfoTitle}
                onChange={handleChange}
                placeholder="Enter additional info title"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Additional Info</label>
              <textarea
                className="form-control"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Enter additional information"
                required
                rows="4"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Information
            </button>
          </form>
        );
      case "education":
        return (
          <form onSubmit={(e) => handleSubmit(e, "Education")}>
            <div className="mb-3">
              <label className="form-label">School/University Name</label>
              <input
                type="text"
                className="form-control"
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="Enter school/university name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Degree/Qualification</label>
              <input
                type="text"
                className="form-control"
                name="educationPosition"
                value={formData.educationPosition}
                onChange={handleChange}
                placeholder="Enter your degree or qualification"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Years Attended</label>
              <input
                type="text"
                className="form-control"
                name="years"
                value={formData.years}
                onChange={handleChange}
                placeholder="Enter years attended (e.g., 2015-2019)"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Information
            </button>
          </form>
        );

      default:
        return <div>No content available</div>;
    }
  };

  return (
    <div className="resume-builder">
      {/* Header Section */}
      <header className="resume-header text-white py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="fw-bold mb-3">
                Professional <span className="highlight">Resume</span> Builder
              </h1>
              <p className="lead">
                Create a stunning resume that gets you noticed by employers
              </p>
              <button className="btn btn-light btn-lg mt-3" onClick={generatePDF}>
                Download PDF
              </button>
              <button className="btn btn-light btn-lg mt-3 ms-3" onClick={generateDOCX}>
                Download DOCX
              </button>
            </div>
            <div className="col-md-6 text-center">
              <img
                src="images/laptop.JPG"
                alt="Resume Illustration"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              {/* Sidebar Navigation */}
              <div className="sidebar-nav card mb-4">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">Resume Sections</h5>
                </div>
                <div className="list-group list-group-flush">
                  {[
                    "basic-info",
                    "work-experience",
                    "education",
                    "projects",
                    "achievements",
                    "summary",
                    "other",
                  ].map((tab) => (
                    <button
                      key={tab}
                      className={`list-group-item list-group-item-action ${
                        activeTab === tab ? "active" : ""
                      }`}
                      onClick={() => handleTabClick(tab)}
                    >
                      {tab
                        .split("-")
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" ")}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-9">
              {/* Form Content */}
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">
                    {activeTab
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </h5>
                </div>
                <div className="card-body">{renderForm(activeTab)}</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Resume Preview Section */}
      <section className="resume-preview py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Resume Preview</h2>
          <div className="card shadow">
            <div className="card-body">
              <div id="printContent" className="resume-template">
                <header className="resume-header text-center py-4 bg-primary text-white">
                  <h1>{formData.name || "Your Name"}</h1>
                  <div className="contact-info">
                    {formData.email && <span>{formData.email}</span>}
                    {formData.phone && <span> | {formData.phone}</span>}
                    {formData.address && <span> | {formData.address}</span>}
                  </div>
                </header>

                <div className="resume-content p-4">
                  {formData.summary && (
                    <section className="mb-4">
                      <h3 className="section-title">Professional Summary</h3>
                      <p>{formData.summary}</p>
                    </section>
                  )}

                  {(formData.company || formData.position) && (
                    <section className="mb-4">
                      <h3 className="section-title">Work Experience</h3>
                      <div className="experience-item">
                        <h4>{formData.position}</h4>
                        <div className="d-flex justify-content-between">
                          <strong>{formData.company}</strong>
                          {formData.experience && (
                            <span>{formData.experience} years</span>
                          )}
                        </div>
                      </div>
                    </section>
                  )}

                  {(formData.school || formData.educationPosition) && (
                    <section className="mb-4">
                      <h3 className="section-title">Education</h3>
                      <div className="education-item">
                        <h4>{formData.educationPosition}</h4>
                        <div className="d-flex justify-content-between">
                          <strong>{formData.school}</strong>
                          {formData.years && <span>{formData.years}</span>}
                        </div>
                      </div>
                    </section>
                  )}

                  {formData.skills && (
                    <section className="mb-4">
                      <h3 className="section-title">Skills</h3>
                      <div className="skills-list">
                        {formData.skills.split(",").map((skill, index) => (
                          <span key={index} className="skill-badge">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {formData.projectTitle && (
                    <section className="mb-4">
                      <h3 className="section-title">Projects</h3>
                      <div className="project-item">
                        <h4>{formData.projectTitle}</h4>
                        <p>{formData.projectDescription}</p>
                        {formData.projectYear && (
                          <div className="text-muted">{formData.projectYear}</div>
                        )}
                      </div>
                    </section>
                  )}

                  {formData.achievementTitle && (
                    <section className="mb-4">
                      <h3 className="section-title">Achievements</h3>
                      <div className="achievement-item">
                        <h4>{formData.achievementTitle}</h4>
                        <p>{formData.achievementDescription}</p>
                        {formData.achievementYear && (
                          <div className="text-muted">
                            {formData.achievementYear}
                          </div>
                        )}
                      </div>
                    </section>
                  )}

                  {formData.additionalInfo && (
                    <section className="mb-4">
                      <h3 className="section-title">
                        {formData.additionalInfoTitle || "Additional Information"}
                      </h3>
                      <p>{formData.additionalInfo}</p>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-primary btn-lg me-3" onClick={generatePDF}>
              <i className="bi bi-file-earmark-pdf me-2"></i>Download PDF
            </button>
            <button className="btn btn-success btn-lg" onClick={generateDOCX}>
              <i className="bi bi-file-earmark-word me-2"></i>Download DOCX
            </button>
          </div>
        </div>
      </section>

      <footer className="py-4 bg-dark text-white text-center">
        <div className="container">
          <p className="mb-0">
            © {new Date().getFullYear()} Professional Resume Builder. All rights
            reserved.By Er.Abhishek Prajapati
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;