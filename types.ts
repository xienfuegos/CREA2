import { ElementType } from 'react';

export interface User {
  firstName: string;
  lastName: string;
}

export interface AcademicEvent {
  title: string;
  start: Date;
  end: Date;
  type: 'cuatrimestre' | 'inscripcion' | 'examen' | 'evaluacion';
}

export interface Tool {
  name: string;
  desc: string;
}

export interface ResourceCategory {
  category: string;
  icon: ElementType;
  tools: Tool[];
}

export interface TutorialStep {
  ui: string;
  state: any;
  hotspot: { 
    top: string; 
    right?: string; 
    left?: string; 
    width: string; 
    height: string; 
    transform?: string 
  };
  text: string;
}

export interface TutorialContent {
  type: string;
  text?: string;
  items?: string[];
}

export interface Tutorial {
  type: 'interactive' | 'standard';
  title: string;
  desc: string;
  steps?: TutorialStep[];
  content?: TutorialContent[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export type AIToolType = 'chat' | 'enricher' | 'stylizer' | 'planner' | 'quiz' | 'abp' | 'inclusion';