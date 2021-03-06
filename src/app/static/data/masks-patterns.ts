import { emailMask } from 'text-mask-addons';
import { IMaskEmail } from '../type';

export const MASK_PHONE: Array<string|RegExp> = ['+', '3', '8', /[0]/, ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/];
export const MASK_EMAIL: IMaskEmail = emailMask;

export const PATTERN_PHONE: string = '^\\+380\\s\\(\\d{2}\\)\\s\\d{3}\\s\\d{2}\\s\\d{2}';
