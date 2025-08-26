# WhatsApp Web Clone

A high-performance WhatsApp Web replica built with Next.js 14, TypeScript, and CSS Modules. This project demonstrates modern React patterns, responsive design, and performance optimization techniques.

## 🚀 Features

- **Authentic WhatsApp Web Experience**: Pixel-perfect recreation of WhatsApp's interface
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Real-time Messaging Simulation**: Interactive chat with typing indicators and message status
- **QR Code Authentication**: Realistic login flow with auto-redirect
- **Modern Tech Stack**: Next.js 14 App Router, TypeScript strict mode, CSS Modules
- **Performance Optimized**: Fast loading, smooth animations, efficient rendering
- **iframe Compatible**: Works perfectly when embedded in other applications

## 🛠 Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: CSS Modules + PostCSS with nesting
- **State Management**: React Context API and custom hooks
- **QR Generation**: qrcode library
- **Image Optimization**: Next.js Image component
- **Performance**: Dynamic imports, code splitting, memoization

## 📁 Project Structure

```
whatsapp-clone/
├── src/
│   ├── app/
│   │   ├── page.tsx          # QR code landing page
│   │   ├── chat/page.tsx     # Main chat interface
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── QRCodeDisplay/    # QR code authentication
│   │   ├── ChatSidebar/      # Contacts list and search
│   │   ├── ChatWindow/       # Main chat area
│   │   └── MessageBubble/    # Individual message component
│   ├── data/
│   │   └── mockData.ts       # Realistic dummy data
│   └── styles/
│       └── globals.css       # CSS variables and base styles
├── public/
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Usage

1. **QR Code Page** (`/`): Shows WhatsApp-style QR code with auto-redirect to chat
2. **Chat Interface** (`/chat`): Full messaging experience with realistic dummy data
3. **Responsive Design**: Works seamlessly across all device sizes

## 🎯 Key Features

- Interactive messaging with typing indicators
- Contact search and filtering
- Message status indicators (sent, delivered, read)
- Online/offline status for contacts
- Mobile-first responsive design
- Performance optimized with memoization and code splitting

## 🔧 Built With

- Next.js 14 App Router
- TypeScript (strict mode)
- CSS Modules + PostCSS
- QRCode.js for QR generation
- Modern React patterns (hooks, context, suspense)

---

**Ready to run in under 45 minutes! 🚀**
