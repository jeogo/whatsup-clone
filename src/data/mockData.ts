export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  contactId: string;
  text: string;
  timestamp: string;
  isFromMe: boolean;
  status: 'sent' | 'delivered' | 'read';
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Mom',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Don\'t forget to call me later!',
    timestamp: '2:30 PM',
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'The meeting is at 3 PM tomorrow',
    timestamp: '1:45 PM',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b390?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Thanks for helping me yesterday! 😊',
    timestamp: '12:15 PM',
    unreadCount: 1,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Dev Team',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'New deployment is ready for testing',
    timestamp: '11:30 AM',
    unreadCount: 5,
    isOnline: false,
  },
  {
    id: '5',
    name: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'See you at the party tonight!',
    timestamp: '10:20 AM',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '6',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Can you review my pull request?',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: false,
  },
  {
    id: '7',
    name: 'Lisa Garcia',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'The restaurant was amazing! 🍕',
    timestamp: 'Yesterday',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '8',
    name: 'Family Group',
    avatar: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=100&h=100&fit=crop&crop=face',
    lastMessage: 'Dad: Planning for weekend trip',
    timestamp: 'Yesterday',
    unreadCount: 3,
    isOnline: false,
  },
];

export const messages: Record<string, Message[]> = {
  '1': [
    {
      id: '1-1',
      contactId: '1',
      text: 'Hi honey, how was your day?',
      timestamp: '1:20 PM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '1-2',
      contactId: '1',
      text: 'It was great! Just finished a big project at work',
      timestamp: '1:25 PM',
      isFromMe: true,
      status: 'read',
    },
    {
      id: '1-3',
      contactId: '1',
      text: 'That\'s wonderful! I\'m proud of you ❤️',
      timestamp: '1:28 PM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '1-4',
      contactId: '1',
      text: 'Don\'t forget to call me later!',
      timestamp: '2:30 PM',
      isFromMe: false,
      status: 'delivered',
    },
    {
      id: '1-5',
      contactId: '1',
      text: 'I need to tell you about dinner plans',
      timestamp: '2:31 PM',
      isFromMe: false,
      status: 'delivered',
    },
  ],
  '2': [
    {
      id: '2-1',
      contactId: '2',
      text: 'Hey, are you available for a quick call?',
      timestamp: '10:30 AM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '2-2',
      contactId: '2',
      text: 'Sure, give me 5 minutes',
      timestamp: '10:32 AM',
      isFromMe: true,
      status: 'read',
    },
    {
      id: '2-3',
      contactId: '2',
      text: 'Perfect! I\'ll call you in a bit',
      timestamp: '10:33 AM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '2-4',
      contactId: '2',
      text: 'The meeting is at 3 PM tomorrow',
      timestamp: '1:45 PM',
      isFromMe: false,
      status: 'read',
    },
  ],
  '3': [
    {
      id: '3-1',
      contactId: '3',
      text: 'Hey! How are you doing?',
      timestamp: '11:45 AM',
      isFromMe: true,
      status: 'read',
    },
    {
      id: '3-2',
      contactId: '3',
      text: 'I\'m doing great! Just got back from vacation',
      timestamp: '11:50 AM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '3-3',
      contactId: '3',
      text: 'That sounds amazing! Where did you go?',
      timestamp: '11:52 AM',
      isFromMe: true,
      status: 'read',
    },
    {
      id: '3-4',
      contactId: '3',
      text: 'I went to Bali! It was incredible 🏝️',
      timestamp: '12:10 PM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '3-5',
      contactId: '3',
      text: 'Thanks for helping me yesterday! 😊',
      timestamp: '12:15 PM',
      isFromMe: false,
      status: 'sent',
    },
  ],
  '4': [
    {
      id: '4-1',
      contactId: '4',
      text: 'Morning everyone! Ready for the sprint review?',
      timestamp: '9:00 AM',
      isFromMe: true,
      status: 'read',
    },
    {
      id: '4-2',
      contactId: '4',
      text: 'Alex: Yes, all features are tested and ready',
      timestamp: '9:15 AM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '4-3',
      contactId: '4',
      text: 'Jessica: The UI looks perfect on mobile too',
      timestamp: '9:20 AM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '4-4',
      contactId: '4',
      text: 'Great work everyone! 🎉',
      timestamp: '9:25 AM',
      isFromMe: true,
      status: 'read',
    },
    {
      id: '4-5',
      contactId: '4',
      text: 'New deployment is ready for testing',
      timestamp: '11:30 AM',
      isFromMe: false,
      status: 'sent',
    },
  ],
  '5': [
    {
      id: '5-1',
      contactId: '5',
      text: 'Can\'t wait for tonight! 🎉',
      timestamp: '8:30 AM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '5-2',
      contactId: '5',
      text: 'Me too! What time should I be there?',
      timestamp: '8:45 AM',
      isFromMe: true,
      status: 'read',
    },
    {
      id: '5-3',
      contactId: '5',
      text: 'Around 7 PM would be perfect',
      timestamp: '9:00 AM',
      isFromMe: false,
      status: 'read',
    },
    {
      id: '5-4',
      contactId: '5',
      text: 'Perfect! I\'ll bring some snacks',
      timestamp: '9:15 AM',
      isFromMe: true,
      status: 'read',
    },
    {
      id: '5-5',
      contactId: '5',
      text: 'See you at the party tonight!',
      timestamp: '10:20 AM',
      isFromMe: false,
      status: 'read',
    },
  ],
};

export const getCurrentTime = (): string => {
  return new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const generateMessageId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const getContactById = (id: string): Contact | undefined => {
  return contacts.find(contact => contact.id === id);
};
