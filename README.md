
# Digital Portal Dashboard

A modern role-based dashboard built with **Next.js, Tailwind, Shadcn UI, Sonner & Recharts**, designed to manage applications, payments and workflow for two personas:  
**Customer Service Officer** & **Supervisor**.

The project demonstrates a production-grade frontend architecture using modular UI components, mock-data logic, analytics visualization, and real-world UX decision-making.

---

##  Features

###  Intelligent UX & Layout
- Clean, focused login experience (no header, no clutter)
- Dashboard reveals key actions within the first **5–10 seconds**
- Summary cards provide high-level insight at a glance
- Charts visualize workflow progress & workload trend
- Search + filter powered tables for quick navigation
- Role-adaptive navigation & permissions

###  Role-Based Behaviors
|             Feature           |       Officer       |   Supervisor  |
|              ---              |         ---         |      ---      |  
| View only their submissions   |           ✔         |       –       |
| Approve / Reject applications |           –         |       ✔       |
| Make payment for pending apps |           ✔         |       –       |
| View analytics across system  | Limited (self only) | Full overview |

---

##  Tech Stack

**Frontend**
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Shadcn UI Components
- Sonner Toast Notifications

**Data & Logic**
- Mock DB (replaceable with API later)
- React context for authenticated user state
- Recharts for data visualization

---

##  Project Structure


#  UX Design Rationale

###  First screen clarity  
User lands on the dashboard and immediately sees:

✔ How many applications exist  
✔ What needs urgent attention  
✔ Pending payments or submissions  
✔ Trends over time (context & history)

This satisfies **"What should I see in first 10 seconds?"**

---

###  Navigation & Cognitive Load  
- The sidebar remains minimal to prevent overwhelm  
- Icons help non-technical users scan fast  
- Only role-relevant links are displayed  
  *→ Reduces decision friction & improves task flow*

---

### Information Density → Balanced  
Avoid overcrowding.

Instead:

- **Summary cards** answer "Where do things stand?"
- **Charts** show progress and workload visually  
- **Table** gives actionable case-level detail  

This moves from **overview → metrics → actions**, a natural mental flow.

---

###  Modularity & Scalability  
Components are isolated and plug-replaceable.
Mock data can later attach to:

- API routes  
- Supabase / Prisma / PostgreSQL  
- Microservices back-end  

No rewrite required — only swap data layer.

---

## Setup & Running

```bash
git clone <repo-url>
cd oo-dashboard
npm install
npm run dev

