
---

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

