import React from 'react';
import { Button, Flex, Text } from '@binarycapsule/ui-capsules';

export const LandingHeader = () => {
  return (
    <Flex direction="column" align="center" css={{ py: '$7' }}>
      <Text
        css={{
          fontFamily: 'Lenox, sans-serif',
          textTransform: 'uppercase',
          fontSize: '50px',
          lineHeight: '50px',
          fontWeight: 600,
          color: '$primary500',
        }}
      >
        BC Editor
      </Text>

      <Text size={1} css={{ color: '$neutral500' }}>
        Rich text editor powered by Prosemirror
      </Text>

      <Flex>
        <Text
          css={{
            color: '$neutral500',
            fontFamily: 'Lenox, sans-serif',
          }}
        >
          BinaryCapsule
        </Text>
      </Flex>

      <Button
        as="a"
        href="https://github.com/jcmnunes/editor"
        leftIcon="github"
        variant="secondary"
        iconVariant="outline"
        css={{ mt: '$5' }}
      >
        GitHub
      </Button>
    </Flex>
  );
};
