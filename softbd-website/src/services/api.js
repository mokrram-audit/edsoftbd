/**
 * API Service Layer
 *
 * Currently uses local JSON data. To switch to a real API, replace
 * the import-based fetchers with fetch()/axios calls to your API endpoints.
 *
 * Example migration for getServices():
 *   // Before (local JSON):
 *   import servicesData from '../data/services.json';
 *   export const getServices = async () => servicesData;
 *
 *   // After (real API):
 *   export const getServices = async () => {
 *     const response = await fetch(`${API_BASE_URL}/services`);
 *     if (!response.ok) throw new Error('Failed to fetch services');
 *     return response.json();
 *   };
 */

// ─── Local JSON Imports ──────────────────────────────────────────────────────
import companyData from '../data/company.json';
import servicesData from '../data/services.json';
import productsData from '../data/products.json';
import projectsData from '../data/projects.json';
import teamData from '../data/team.json';
import testimonialsData from '../data/testimonials.json';
import clientsData from '../data/clients.json';
import technologiesData from '../data/technologies.json';

// ─── Config ──────────────────────────────────────────────────────────────────
// Replace with your actual API base URL when switching to a real backend
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.technovasolutions.com/v1';

// ─── Helper ───────────────────────────────────────────────────────────────────
const simulateDelay = (ms = 0) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── API Functions ────────────────────────────────────────────────────────────

export const getCompanyInfo = async () => {
  await simulateDelay();
  return companyData;
};

export const getServices = async () => {
  await simulateDelay();
  return servicesData;
};

export const getProducts = async () => {
  await simulateDelay();
  return productsData;
};

export const getProjects = async () => {
  await simulateDelay();
  return projectsData;
};

export const getProjectById = async (id) => {
  await simulateDelay();
  return projectsData.find((p) => p.id === id) || null;
};

export const getTeam = async () => {
  await simulateDelay();
  return teamData;
};

export const getTestimonials = async () => {
  await simulateDelay();
  return testimonialsData;
};

export const getClients = async () => {
  await simulateDelay();
  return clientsData;
};

export const getTechnologies = async () => {
  await simulateDelay();
  return technologiesData;
};

export const submitContactForm = async (formData) => {
  await simulateDelay(600);
  // Replace with: return fetch(`${API_BASE_URL}/contact`, { method: 'POST', body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } }).then(r => r.json());
  console.log('Contact form submitted:', formData);
  return { success: true, message: 'Your message has been sent successfully!' };
};
