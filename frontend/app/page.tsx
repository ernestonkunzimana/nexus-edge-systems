import DynamicDashboard from '../components/DynamicDashboard'

/**
 * Home Page
 * 
 * Displays the main dashboard which pulls all content dynamically from backend APIs.
 * The DynamicDashboard component fetches and displays:
 * - Services: IT solutions offered
 * - Devices: Equipment we maintain
 * - Team: Staff members
 * - Projects: Portfolio showcase
 */
export default function Page() {
  return <DynamicDashboard />
}
