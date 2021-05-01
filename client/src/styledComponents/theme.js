// default theme preset

export const theme = {
    colors: {
      text: '#000',
      background: '#fff',
      primary: '#000',
      secondary: '#ff5446',
      muted: '#f6f6f9',
      gray: '#dddddf',
      darkGray: '#acacb5',
      highlight: 'hsla(205, 100%, 40%, 0.125)',
    },
    fonts: {
      body:
        'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif,Helvetica,Arial,Apple Color Emoji,Segoe UI Emoji',
      heading: 'inherit',
      monospace: 'Silom, monospace',
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.25,
      tight: 1.2,
      relaxed: 1.625,
    },
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
    sizes: {
      avatar: 48,
    },
    radii: {
      default: 4,
      circle: 99999,
      card: 6,
    },
    shadows: {
      card: '0 0 4px rgba(0, 0, 0, .125)',
      large: '4px 4px 12px rgba(0, 0, 0, .07)',
    },
    // rebass variants
    text: {
      heading: {
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
      },
      display: {
        fontFamily: 'heading',
        fontWeight: 'heading',
        lineHeight: 'heading',
        fontSize: [5, 6, 7],
      },
      caps: {
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
      },
    },
    variants: {
      avatar: {
        width: 'avatar',
        height: 'avatar',
        borderRadius: 'circle',
      },
      card: {
        p: 2,
        bg: 'background',
        boxShadow: 'card',
        borderRadius: 'card',
      },
      link: {
        color: 'primary',
      },
      nav: {
        fontSize: 1,
        fontWeight: 'bold',
        display: 'inline-block',
        p: 2,
        color: 'inherit',
        textDecoration: 'none',
        ':hover,:focus,.active': {
          color: 'primary',
        },
      },
    },
    buttons: {
      primary: {
        fontSize: 2,
        fontWeight: 'bold',
        color: 'background',
        bg: 'primary',
        borderRadius: 'default',
      },
      outline: {
        variant: 'buttons.primary',
        color: 'primary',
        bg: 'transparent',
        boxShadow: 'inset 0 0 2px',
      },
      secondary: {
        variant: 'buttons.primary',
        color: 'background',
        bg: 'secondary',
      },
      disabled: {
        variant: 'buttons.primary',
        color: 'gray',
        bg: 'darkGray',
      }
    },
    styles: {
      root: {
        fontFamily: 'body',
        fontWeight: 'body',
        lineHeight: 'body',
      },
    },
  };
    