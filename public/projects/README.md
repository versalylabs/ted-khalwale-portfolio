# Project Visuals Directory

This folder contains the visual mockup previews for your showcased projects.

### Default Assets Included:
1. `retailflow.svg` — RetailFlow Business & Inventory Management System
2. `pulseboard.svg` — PulseBoard Operations & Analytics Dashboard
3. `storefront.svg` — StoreFront High-Performance E-Commerce Web App
4. `taskorbit.svg` — TaskOrbit Team Workflow & Project Collaboration Tool
5. `billcraft.svg` — BillCraft Invoicing & Client Billing Software
6. `nexusstudio.svg` — NexusStudio Modern Business & Booking Website

### How to use your own screenshots:
1. Save your screenshot as a PNG or JPG in this `/public/projects/` folder (e.g. `retailflow.png`).
2. Open `src/data/portfolioData.ts`.
3. Update the `imageUrl` and `screenshots` fields for that project:
   ```ts
   imageUrl: "/projects/retailflow.png",
   screenshots: ["/projects/retailflow.png"]
   ```
4. The website will automatically display your real screenshots across project cards, the products catalog, and the case study lightbox!
