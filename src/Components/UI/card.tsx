import * as React from "react";
import {
  ContentCard,
  ContentCardBody,
  ContentCardTitle,
  ContentCardSubtitle,
  Typography,
  Utility,
  Button,
  Link,
} from "@visa/nova-react";
import { VisaChevronRightTiny } from "@visa/nova-icons-react";

export function Card(props: React.ComponentProps<typeof ContentCard>) {
  return <ContentCard {...props} />;
}

export function CardBody({
  children,
  className,
  ...props
}: React.ComponentProps<typeof ContentCardBody>) {
  return (
    <Utility vFlex vFlexCol vGap={4}>
      <ContentCardBody className={className} {...props}>
        {children}
      </ContentCardBody>
    </Utility>
  );
}

export function CardTitle(props: React.ComponentProps<typeof ContentCardTitle>) {
  return <ContentCardTitle variant="headline-4" {...props} />;
}

export function CardSubtitle(props: React.ComponentProps<typeof ContentCardSubtitle>) {
  return <ContentCardSubtitle variant="subtitle-3" {...props} />;
}

export function CardDescription(props: React.ComponentProps<typeof Typography>) {
  return <Typography {...props} />;
}

export function CardActions(props: React.ComponentProps<typeof Utility>) {
  return <Utility vAlignItems="center" vFlex vFlexWrap vGap={16} vPaddingTop={12} {...props} />;
}

export const CustomVisaCard = () => {
  return (
    <Card>
      <CardBody>
        <CardTitle>Headline</CardTitle>
        <CardSubtitle>Subtitle</CardSubtitle>
        <CardDescription>
          This is optional text that describes the headline and subtitle in more detail.
        </CardDescription>
        <CardActions>
          <Button>Primary action</Button>
          <Link href="./content-card" noUnderline>
            Destination label <VisaChevronRightTiny rtl />
          </Link>
        </CardActions>
      </CardBody>
    </Card>
  );
};
