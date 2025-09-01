# Parking Reservation System

A parking management system with employee and admin flows.  
The application is organized into **4 main pages**:

---

## 1. Gates Page (`/gates`)

- Displays a list of **parking gates**.  
- Each gate shows:  
  - `id`  
  - name
  - location
  - numbers of zones
  - zones id
- Users can select a specific gate → navigates to `/gates/:gateId`.  

---

## 2. Gate Details (`/gates/:gateId`)

- Displays a list of **Zones of selected gate**
- Each zone shows: name, category, occupied, free, reserved, availableForVisitors, availableForSubscribers, rateNormal, rateSpecial, and open status
- User can book a ticket as a visitor
- Subscriber can book a ticket with subscription id
- Each zone updated in real time event after user book a ticket
- Each ticket display: ticket id, Check-in, Zone, Gate, Rate and print ticket button 

---

## 3. Ticket Checkout (`/checkout`)

- Employee login (useing POST /auth/login); protect screen.  
- Handle error authentication
- Employee data saves in session storage
- Employee next enter ticket id
- After checkout shown tickets details: ticket id, check-in, check-out, duration, total amount, and breakdowns
- Each breakdown shown: Normal or Special, from, to, rate, and total amount
⚠️ **Attention**: subscription id isn't included in ticket info so i can't make this task (Convert to Visitor).

---

## 4. Admin Dashboard (`/admin`)`

- Requires **Admin login** (`POST /auth/login`).  
- Includes the following sections:  

### Parking State Report (Zones)  
- Fetch overall parking state (`GET /admin/reports/parking-state`).  
- Displays zone metrics:  
  - `occupied`  
  - `free`  
  - `reserved`  
  - `availableForVisitors`  
  - `availableForSubscribers`  
  - `subscriberCount`  
  - `open`  
- Open/close a zone (`PUT /admin/zones/:id/open`).  

### Categories
- Fetch overall categories (`GET /api/v1/master/categories`).
- Update category rates (`PUT /admin/categories/:id`).

- Add rush hours button (`POST /admin/rush-hours`).  
- Add vacations button (`POST /admin/vacations`).

### Live Audit Log  
- Listens to **admin-update WebSocket messages**.  
- Shows actions in real time with for **4 Events**:  
  - timestamp  
  - action performed  
  - admin id 
  
⚠️ **Attention**: POST /admin/users, GET /admin/users not exist in readme file or server.js code or setup.js code.

---

## 🔄 Flow Diagram

```mermaid
flowchart LR
    Gates[/Gates Page/] --> GateDetails[/Gate Details/]
    GateDetails --> Checkout[/Ticket Checkout/]
    Admin[Admin Dashboard]
