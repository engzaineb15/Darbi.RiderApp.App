// types.ts

// Define the structure for a single message
export interface IMessage {
  id:string;
  roomId: string;
  message?: string;
  messageType: 'message' | 'location' | 'contract';
  receiverId:string;
  createdAt?: Date;
  sender?: 'user' | 'receiver' | 'system';
  location?: {
    latitude: number;
    longitude: number;
  };
}
  
  // Define the structure for the root state in Redux
  export interface IRootState {
    user: {
      id: string;
      name: string;
      // Add other user properties as needed
    };
    messages: IMessage[];
    // Add other state properties as needed
  }
  
  // Define any other common types or interfaces here
  