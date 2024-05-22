export interface Instruction {
  buttons: (string | React.ReactElement)[];
  description: string;
}

export interface StyledComponent {
  styles?: string;
}
