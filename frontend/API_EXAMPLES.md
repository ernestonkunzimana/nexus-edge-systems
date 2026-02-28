# API Response Examples & Testing Guide

This document provides example API responses to help you:
1. **Understand the expected data format**
2. **Test the dashboard without a real backend**
3. **Create mock data for development**

## Complete Example Data Set

### Services API Response
**Endpoint:** `GET http://localhost:8000/api/v1/services`

```json
[
  {
    "id": "svc_001",
    "name": "CBS Software",
    "description": "Comprehensive Core Banking Solution for financial institutions. Handles transactions, customer management, and reporting.",
    "category": "Software",
    "image": "https://example.com/images/cbs.jpg"
  },
  {
    "id": "svc_002",
    "name": "IoT Solutions",
    "description": "Internet of Things integration for smart devices and connected systems. Enables remote monitoring and control.",
    "category": "Hardware",
    "image": "https://example.com/images/iot.jpg"
  },
  {
    "id": "svc_003",
    "name": "Hardware Maintenance",
    "description": "Preventive and corrective maintenance for all computer hardware and peripherals.",
    "category": "Service",
    "image": "https://example.com/images/hardware.jpg"
  },
  {
    "id": "svc_004",
    "name": "Network Infrastructure",
    "description": "Design, implementation, and management of secure network systems.",
    "category": "Infrastructure",
    "image": "https://example.com/images/network.jpg"
  },
  {
    "id": "svc_005",
    "name": "CCTV & Security",
    "description": "Complete surveillance system design, installation, and monitoring services.",
    "category": "Security",
    "image": "https://example.com/images/cctv.jpg"
  },
  {
    "id": "svc_006",
    "name": "Cloud Solutions",
    "description": "Secure cloud infrastructure and data backup solutions for business continuity.",
    "category": "Cloud",
    "image": "https://example.com/images/cloud.jpg"
  }
]
```

### Devices API Response
**Endpoint:** `GET http://localhost:8000/api/v1/devices`

```json
[
  {
    "id": "dev_001",
    "name": "HP Desktop Computer",
    "brand": "HP",
    "type": "Desktop",
    "description": "High-performance desktop computers for office use. Supports Windows and Linux.",
    "issuesFixed": "Hardware failures, OS crashes, driver issues, BIOS updates",
    "image": "https://example.com/images/hp-desktop.jpg"
  },
  {
    "id": "dev_002",
    "name": "Epson LQ-590II Printer",
    "brand": "Epson",
    "type": "Printer",
    "description": "Reliable impact dot matrix printer for continuous paper printing.",
    "issuesFixed": "Print head clogs, paper feed issues, ribbon replacement",
    "image": "https://example.com/images/epson-printer.jpg"
  },
  {
    "id": "dev_003",
    "name": "Nigachi Money Counter",
    "brand": "Nigachi",
    "type": "Currency Equipment",
    "description": "High-speed currency counting and checking machine for banks and businesses.",
    "issuesFixed": "Sensor alignment, motor issues, counting accuracy calibration",
    "image": "https://example.com/images/nigachi-counter.jpg"
  },
  {
    "id": "dev_004",
    "name": "Cisco Network Switch",
    "brand": "Cisco",
    "type": "Networking",
    "description": "Enterprise-grade managed network switches for reliable connectivity.",
    "issuesFixed": "Port configuration, VLAN setup, firmware updates",
    "image": "https://example.com/images/cisco-switch.jpg"
  },
  {
    "id": "dev_005",
    "name": "UPS Battery Backup",
    "brand": "APC",
    "type": "Power Supply",
    "description": "Uninterruptible Power Supply for continuous operation during power failures.",
    "issuesFixed": "Battery replacement, charging issues, surge protection",
    "image": "https://example.com/images/apc-ups.jpg"
  },
  {
    "id": "dev_006",
    "name": "Diesel Generator",
    "brand": "Caterpillar",
    "type": "Power Generation",
    "description": "Heavy-duty diesel generator for backup power in off-grid locations.",
    "issuesFixed": "Engine maintenance, fuel system, electrical connections",
    "image": "https://example.com/images/generator.jpg"
  },
  {
    "id": "dev_007",
    "name": "CCTV IP Camera",
    "brand": "Hikvision",
    "type": "Security",
    "description": "4K IP camera for high-definition surveillance and recording.",
    "issuesFixed": "Network configuration, lens cleaning, firmware updates",
    "image": "https://example.com/images/hikvision-camera.jpg"
  },
  {
    "id": "dev_008",
    "name": "NVR Recording System",
    "brand": "Hikvision",
    "type": "Security",
    "description": "Network Video Recorder for centralized CCTV system management.",
    "issuesFixed": "HDD replacement, network setup, video playback issues",
    "image": "https://example.com/images/nvr-system.jpg"
  }
]
```

### Team API Response
**Endpoint:** `GET http://localhost:8000/api/v1/team`

```json
[
  {
    "id": "tm_001",
    "name": "Ernest Kunzimana",
    "position": "Technical Director",
    "expertise": "Infrastructure, Network Design, IT Strategy",
    "whatsapp": "+256700123456"
  },
  {
    "id": "tm_002",
    "name": "James Habimana",
    "position": "Senior Systems Engineer",
    "expertise": "Linux Administration, Database Management, Cloud Infrastructure",
    "whatsapp": "+256701234567"
  },
  {
    "id": "tm_003",
    "name": "Grace Ikiriza",
    "position": "Hardware Specialist",
    "expertise": "Computer Assembly, Printer Repair, UPS & Generator Maintenance",
    "whatsapp": "+256702345678"
  },
  {
    "id": "tm_004",
    "name": "David Ochieng",
    "position": "Network Administrator",
    "expertise": "Network Configuration, CCTV Systems, Cybersecurity",
    "whatsapp": "+256703456789"
  },
  {
    "id": "tm_005",
    "name": "Sarah Kipchoge",
    "position": "Software Developer",
    "expertise": "Application Development, Database Design, API Integration",
    "whatsapp": "+256704567890"
  },
  {
    "id": "tm_006",
    "name": "Peter Kiplagat",
    "position": "Field Technician",
    "expertise": "On-site Installation, Troubleshooting, Equipment Maintenance",
    "whatsapp": "+256705678901"
  },
  {
    "id": "tm_007",
    "name": "Alice Muhoro",
    "position": "Client Support Specialist",
    "expertise": "Technical Support, Training, Client Relations",
    "whatsapp": "+256706789012"
  },
  {
    "id": "tm_008",
    "name": "Michael Kariuki",
    "position": "Security Systems Manager",
    "expertise": "CCTV Design, Access Control, Security Protocols",
    "whatsapp": "+256707890123"
  }
]
```

### Projects API Response
**Endpoint:** `GET http://localhost:8000/api/v1/projects`

```json
[
  {
    "id": "proj_001",
    "name": "Aetha - Pan-African Cloud Infrastructure",
    "description": "Building a continental cloud infrastructure platform for African businesses. Involves data centers, networking, and service integration across multiple countries.",
    "completion": 45
  },
  {
    "id": "proj_002",
    "name": "Aether Vision - AI Drone System",
    "description": "Developing autonomous drone systems powered by AI for surveillance, agriculture monitoring, and disaster response.",
    "completion": 62
  },
  {
    "id": "proj_003",
    "name": "Rwanda SkyLink Network",
    "description": "Implementing high-speed internet connectivity across rural Rwanda using satellite and wireless mesh networks.",
    "completion": 38
  },
  {
    "id": "proj_004",
    "name": "AgriLink Rwanda - Smart Farming",
    "description": "IoT-based agricultural platform providing farmers with real-time weather, soil, and crop monitoring data.",
    "completion": 55
  },
  {
    "id": "proj_005",
    "name": "Financial Institution Digital Transformation",
    "description": "Comprehensive modernization of banking systems including core banking software, mobile platforms, and cybersecurity infrastructure.",
    "completion": 78
  }
]
```

## Testing with cURL

### Test Services Endpoint
```bash
curl -X GET http://localhost:8000/api/v1/services \
  -H "Content-Type: application/json"
```

Expected response: Array of service objects

### Test Devices Endpoint
```bash
curl -X GET http://localhost:8000/api/v1/devices \
  -H "Content-Type: application/json"
```

Expected response: Array of device objects

### Test Team Endpoint
```bash
curl -X GET http://localhost:8000/api/v1/team \
  -H "Content-Type: application/json"
```

Expected response: Array of team member objects

### Test Projects Endpoint
```bash
curl -X GET http://localhost:8000/api/v1/projects \
  -H "Content-Type: application/json"
```

Expected response: Array of project objects

## Testing with JavaScript Fetch

### In Browser Console
```javascript
// Test Services
fetch('http://localhost:8000/api/v1/services')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Test Devices
fetch('http://localhost:8000/api/v1/devices')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Test Team
fetch('http://localhost:8000/api/v1/team')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)

// Test Projects
fetch('http://localhost:8000/api/v1/projects')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

## Data Validation Rules

### Services Validation
```javascript
const isValidService = (service) => {
  return (
    service.id && typeof service.id === 'string' &&
    service.name && typeof service.name === 'string' &&
    service.description && typeof service.description === 'string' &&
    service.category && typeof service.category === 'string'
    // image is optional
  )
}
```

### Devices Validation
```javascript
const isValidDevice = (device) => {
  return (
    device.id && typeof device.id === 'string' &&
    device.name && typeof device.name === 'string' &&
    device.brand && typeof device.brand === 'string' &&
    device.type && typeof device.type === 'string' &&
    device.description && typeof device.description === 'string'
    // image and issuesFixed are optional
  )
}
```

### Team Validation
```javascript
const isValidTeamMember = (member) => {
  return (
    member.id && typeof member.id === 'string' &&
    member.name && typeof member.name === 'string' &&
    member.position && typeof member.position === 'string' &&
    member.expertise && typeof member.expertise === 'string' &&
    member.whatsapp && typeof member.whatsapp === 'string'
  )
}
```

### Projects Validation
```javascript
const isValidProject = (project) => {
  return (
    project.id && typeof project.id === 'string' &&
    project.name && typeof project.name === 'string' &&
    project.description && typeof project.description === 'string' &&
    typeof project.completion === 'number' &&
    project.completion >= 0 && project.completion <= 100
  )
}
```

## Mock Backend Setup (For Development)

If your backend isn't ready yet, you can mock the API responses:

### Using SWR Mock
```typescript
// lib/api/mock-fetcher.ts
const mockServices = [
  { id: 'svc_001', name: 'CBS Software', ... },
  // ... more services
]

const mockDevices = [
  // ... mock devices
]

// ... etc

export const mockFetcher = (url: string) => {
  if (url.includes('/services')) return Promise.resolve(mockServices)
  if (url.includes('/devices')) return Promise.resolve(mockDevices)
  // ... etc
  return Promise.reject(new Error('Unknown endpoint'))
}
```

Then update useServices hook:
```typescript
import { mockFetcher } from './mock-fetcher'

const fetcher = process.env.NEXT_PUBLIC_USE_MOCK === 'true' 
  ? mockFetcher 
  : (url: string) => fetch(url).then(r => r.json())
```

Set in `.env.local`:
```env
NEXT_PUBLIC_USE_MOCK=true
```

## Response Headers Best Practices

### Recommended Backend Headers
```
Content-Type: application/json
Cache-Control: public, max-age=30
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### Why These Matter
- **Content-Type:** Tells browser it's JSON
- **Cache-Control:** Works with SWR caching strategy
- **CORS Headers:** Allow frontend to access API
- **Methods:** Specify what HTTP methods are allowed

## Error Response Examples

### API Server Error
```json
{
  "error": "Internal Server Error",
  "message": "Failed to connect to database",
  "status": 500
}
```

### Not Found
```json
{
  "error": "Not Found",
  "message": "Resource does not exist",
  "status": 404
}
```

### Unauthorized
```json
{
  "error": "Unauthorized",
  "message": "Valid API key required",
  "status": 401
}
```

The dashboard handles these gracefully and shows helpful error messages.

## Performance Considerations

### Optimal Response Sizes
- **Services:** ~5-10 items (< 50KB total)
- **Devices:** ~8-15 items (< 80KB total)
- **Team:** ~5-10 items (< 30KB total)
- **Projects:** ~5-10 items (< 40KB total)

### Optimal Response Times
- **Acceptable:** < 500ms per endpoint
- **Good:** < 200ms per endpoint
- **Excellent:** < 100ms per endpoint

### Pagination (For Large Datasets)
If you have > 20 items per category, implement pagination:

```json
{
  "data": [...],
  "page": 1,
  "pageSize": 10,
  "total": 45,
  "hasMore": true
}
```

Then update hooks to handle pagination.

## Testing Checklist

- [ ] All 4 endpoints return 200 OK
- [ ] Response content is valid JSON
- [ ] All required fields present
- [ ] No sensitive data exposed
- [ ] Response time < 500ms
- [ ] CORS headers present
- [ ] Error responses formatted consistently
- [ ] Images URLs are valid and accessible
- [ ] WhatsApp numbers in correct format (+country code)
- [ ] Completion percentages 0-100
- [ ] No null/undefined in required fields

## Troubleshooting API Issues

### Backend Not Running
```
Dashboard shows: "No services found"
Solution: Start backend server on http://localhost:8000
```

### Wrong API Base URL
```
Dashboard shows: "No services found"
Check: .env.local has correct NEXT_PUBLIC_API_BASE
```

### CORS Error
```
Browser console shows: CORS error
Solution: Add CORS headers to backend responses
```

### JSON Parsing Error
```
Browser console shows: JSON parsing error
Check: Response is valid JSON, not HTML error page
```

### Timeout
```
Dashboard shows: Spinner forever
Solution: Check backend is responding, check network latency
```

## Next Steps

1. **Use this file as reference** for expected data format
2. **Share with backend team** to ensure compatibility
3. **Test endpoints** using cURL or browser console
4. **Run dashboard** once backend returns expected data
5. **Monitor Network tab** in DevTools to verify API calls

---

**These examples match exactly what the dashboard expects.**

If your backend returns data in this format, the dashboard will work perfectly.

