import React from 'react';
import { Button, Flex, Text } from '@binarycapsule/ui-capsules';
import { useTheme } from 'styled-components';

export const LandingHeader = () => {
  const theme = useTheme();

  return (
    <Flex direction="column" align="center" style={{ padding: '28px 0' }}>
      <Text
        style={{
          fontFamily: 'Lenox, sans-serif',
          textTransform: 'uppercase',
          fontSize: '50px',
          lineHeight: '50px',
          fontWeight: 600,
          color: theme.colors.primary500,
        }}
      >
        BC Editor
      </Text>

      <Text size="md" style={{ color: theme.colors.neutral500 }}>
        Rich text editor powered by Prosemirror
      </Text>

      <Button
        as="a"
        href="https://github.com/jcmnunes/editor"
        leftIcon="github"
        variant="secondary"
        iconVariant="outline"
        style={{ marginTop: 20 }}
      >
        GitHub
      </Button>
    </Flex>
  );
};
