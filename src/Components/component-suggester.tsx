"use client";

// Accurate Component Metadata from Visa Nova Docs
const VISA_COMPONENTS = {
  Button: {
    name: "Button",
    category: "Form",
    description: "Primary button with variant, size, and loading support",
    props: ["variant", "size", "disabled", "loading", "onClick"],
  },
  Input: {
    name: "Input",
    category: "Form",
    description: "Text field with accessibility and state control",
    props: ["type", "placeholder", "value", "onChange", "disabled"],
  },
  InputContainer: {
    name: "InputContainer",
    category: "Form",
    description: "Wrapper for input to provide consistent spacing and style",
    props: ["children"],
  },
  Label: {
    name: "Label",
    category: "Form",
    description: "Accessible label for form fields",
    props: ["htmlFor", "children"],
  },
  Checkbox: {
    name: "Checkbox",
    category: "Form",
    description: "Boolean input with label and accessible states",
    props: ["checked", "onChange", "label"],
  },
  Card: {
    name: "Card",
    category: "Layout",
    description: "Flexible surface container for sections",
    props: ["children"],
  },
  Modal: {
    name: "Modal",
    category: "Feedback",
    description: "Dialog window for user interaction",
    props: ["open", "onClose", "title", "size", "children"],
  },
  Table: {
    name: "Table",
    category: "Data Display",
    description: "Table component for displaying structured data",
    props: ["data", "columns"],
  },
  Avatar: {
    name: "Avatar",
    category: "Data Display",
    description: "User profile image with fallback",
    props: ["src", "alt"],
  },
  Toast: {
    name: "Toast",
    category: "Feedback",
    description: "Notification component",
    props: ["variant", "title", "message"],
  },
  Pagination: {
    name: "Pagination",
    category: "Navigation",
    description: "Pagination control for navigating pages",
    props: ["children"],
  },
  PaginationOverflow: {
    name: "PaginationOverflow",
    category: "Navigation",
    description: "Indicates hidden pagination pages",
    props: ["children"],
  },
};

export class ComponentSuggester {
  static suggest(query: string): { components: any[]; code: string } {
    const normalizedQuery = query.toLowerCase();
    const components: any[] = [];

    const match = (keywords: string[]) => keywords.some((k) => normalizedQuery.includes(k));

    if (match(["login", "sign in", "form"])) {
      components.push(
        VISA_COMPONENTS.Card,
        VISA_COMPONENTS.Label,
        VISA_COMPONENTS.Input,
        VISA_COMPONENTS.InputContainer,
        VISA_COMPONENTS.Checkbox,
        VISA_COMPONENTS.Button
      );
    } else if (match(["credit card", "payment", "card input"])) {
      components.push(
        VISA_COMPONENTS.Label,
        VISA_COMPONENTS.Input,
        VISA_COMPONENTS.InputContainer,
        VISA_COMPONENTS.Card,
        VISA_COMPONENTS.Button
      );
    } else if (match(["pagination", "data table", "sort", "page"])) {
      components.push(
        VISA_COMPONENTS.Card,
        VISA_COMPONENTS.Table,
        VISA_COMPONENTS.Pagination,
        VISA_COMPONENTS.PaginationOverflow
      );
    } else if (match(["profile", "avatar", "user icon"])) {
      components.push(VISA_COMPONENTS.Avatar);
    } else if (match(["toast", "notification"])) {
      components.push(VISA_COMPONENTS.Toast);
    } else if (match(["modal", "dialog"])) {
      components.push(VISA_COMPONENTS.Modal, VISA_COMPONENTS.Button);
    } else {
      components.push(VISA_COMPONENTS.Card, VISA_COMPONENTS.Button);
    }

    const code = this.generateCode(normalizedQuery);

    return {
      components,
      code,
    };
  }

  private static generateCode(query: string): string {
    if (query.includes("login") || query.includes("sign in")) {
      return `
import { Button, Input, InputContainer, Label, Checkbox, Card, Utility } from '@visa/nova-react';
import { useState } from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  return (
    <Card>
      <Utility vFlex vFlexCol vGap={6}>
        <Label htmlFor="email">Email</Label>
        <InputContainer>
          <Input id="email" type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </InputContainer>

        <Label htmlFor="password">Password</Label>
        <InputContainer>
          <Input id="password" type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </InputContainer>

        <Checkbox label="Remember Me" checked={remember} onChange={() => setRemember(!remember)} />

        <Button type="submit" variant="primary">Sign In</Button>
      </Utility>
    </Card>
  );
}`;
    }

    if (query.includes("credit card") || query.includes("payment")) {
      return `
import { Input, InputContainer, Label, Card, Utility, Button } from '@visa/nova-react';

export function CreditCardForm() {
  return (
    <Card>
      <Utility vFlex vFlexCol vGap={6}>
        <Label htmlFor="cardNumber">Card Number</Label>
        <InputContainer>
          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
        </InputContainer>

        <Label htmlFor="expiry">Expires (MM/YY)</Label>
        <Utility vFlex vFlexRow vGap={4}>
          <Input placeholder="MM" /> / <Input placeholder="YY" />
        </Utility>

        <Label htmlFor="cvv">Security Code</Label>
        <InputContainer>
          <Input id="cvv" type="password" placeholder="•••" />
        </InputContainer>

        <Button variant="primary">Submit Payment</Button>
      </Utility>
    </Card>
  );
}`;
    }

    if (query.includes("pagination") || query.includes("table")) {
      return `
import { Table, Card, Pagination, PaginationOverflow, Button } from '@visa/nova-react';
import { VisaChevronLeftTiny, VisaChevronRightTiny, VisaOptionHorizontalTiny } from '@visa/nova-icons-react';

export function PaginatedTable() {
  const data = [
    { name: 'Alice', email: 'alice@visa.com' },
    { name: 'Bob', email: 'bob@visa.com' },
  ];
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
  ];

  return (
    <Card>
      <Table data={data} columns={columns} />
      <Pagination>
        <li><Button iconButton><VisaChevronLeftTiny /></Button></li>
        <li><Button>1</Button></li>
        <li><Button>2</Button></li>
        <PaginationOverflow><VisaOptionHorizontalTiny /></PaginationOverflow>
        <li><Button iconButton><VisaChevronRightTiny /></Button></li>
      </Pagination>
    </Card>
  );
}`;
    }

    return `
import { Card, Button } from '@visa/nova-react';

export function ExampleComponent() {
  return (
    <Card>
      <Button>Click Me</Button>
    </Card>
  );
}`;
  }
}
