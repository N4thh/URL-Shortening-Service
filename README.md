#  URL-Shortening-Service

## A Simple & Powerful URL Shortening Platform

A modern web application that allows users to shorten URLs and track detailed analytics such as clicks, devices, locations, operating systems, and browsers.

---

## Features

* Shorten long URLs into clean, shareable links
* Track total clicks per shortened URL
* Analytics by device types
* Location tracking (country / region of visitors)
* Show: OS, Browser of visitors.
* Responsive design for all devices

---

##  Features To Be Added

Check [Issues](https://github.com/N4thh/URL-Shortening-Service/issues) to contribute to this repository.

---

##  Tech Stack

* Next.js  
* TypeScript  
* Tailwind CSS  
* PostgreSQL  
* Prisma ORM  

---

##  References

* Database: PostgreSQL  
* UI/UX Inspiration: [Figma AI Design](https://www.figma.com/make/nITd35ASXMpU3SaIOyDn3t/URL-Shortening-Service?p=f&t=KWPnQQCn4Vuxb3We-0)

* Package: 
- [base 62](https://www.npmjs.com/package/base62)
- [uuid](https://www.npmjs.com/package/uuid)
- [geoip-country](https://www.npmjs.com/package/geoip-country)
- [ua-parser-js](https://www.npmjs.com/package/ua-parser-js)

## Installation Guide

Follow the steps below to run this project locally.

> Make sure PostgreSQL is installed and running before starting.

``bash
git clone https://github.com/N4thh/URL-Shortening-Service.git

cd URL-Shortening-Service\my-app

### Install Dependencies
npm install

### Setup Environment Variables
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/personalnote"
JWT_SECRET="your_secret_key"

### Setup Database (Prisma)
npx prisma migrate dev
npx prisma generate

(Optional) Open Prisma Studio:
npx prisma studio

### Run the Development Server
npm run dev

---

##  Website Demo

### Dashboard
<p>
  <img src="./images/dashboard.png" width="48%" />
  <img src="./images/dashboard2.png" width="48%" />
</p>

### Analytics

<p>
  <img src="./images/analyticsBoard.png" width="48%" />
  <img src="./images/analyticsBoard2.png" width="48%" />
</p>
---

##  Author

**Nguyen Nhat Anh**  
- Email: nhatahh2003@gmail.com  
- LinkedIn: https://www.linkedin.com/in/nhật-anh-nguyễn-508018324/  
- GitHub: https://github.com/N4thh
