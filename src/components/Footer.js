import { useIdentityContext } from 'react-netlify-identity';

import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { Footer as RBXFooter, Container, Column, Generic } from 'rbx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { REPO_LINK, DISCORD_LINK, BRAND_NAME } from '../constants/env';
import * as ROUTES from '../constants/routes';

import ExternalLink from './ExternalLink';
import Icon from './Icon';
import LanguageSwitch from './LanguageSwitch';
import ThemeSwitch from './ThemeSwitch';

/**
 *
 * @param {{children: JSX.Element;}} props
 */
function Link({ children, ...rest }) {
  return (
    <NavLink activeClassName="is-active" {...rest}>
      {children}
    </NavLink>
  );
}

export default function Footer() {
  const { isLoggedIn, isConfirmedUser } = useIdentityContext();
  const { t } = useTranslation(['footer', 'routes', 'navigation']);

  return (
    <RBXFooter as="footer">
      <Container as="nav" aria-label="meta navigation">
        <Column.Group>
          <Column size={4}>
            <ul>
              <Generic as="li" textWeight="semibold">
                {BRAND_NAME}
              </Generic>
              <li>
                <InternalLink route={ROUTES.LANDING_PAGE} t={t} />
              </li>
              {!isLoggedIn || !isConfirmedUser ? (
                <>
                  <li>
                    <InternalLink route={ROUTES.REGISTER} t={t} />
                  </li>
                  <li>
                    <InternalLink route={ROUTES.LOGIN} t={t} />
                  </li>
                  <li>
                    <InternalLink route={ROUTES.RESET_PASSWORD} t={t} />
                  </li>
                </>
              ) : (
                <li>
                  <InternalLink route={ROUTES.SETTINGS} t={t} />
                </li>
              )}
            </ul>
          </Column>

          <Column size={4}>
            <ul>
              <Generic as="li" textWeight="semibold">
                {t('legal')}
              </Generic>
              <li>
                <InternalLink route={ROUTES.TOS} t={t} />
              </li>
              <li>
                <InternalLink route={ROUTES.PRIVACY_POLICY} t={t} />
              </li>
            </ul>
          </Column>

          <Column size={4}>
            <ul>
              <Generic as="li" textWeight="semibold">
                {t('other')}
              </Generic>
              <li>
                <ThemeSwitch from="footer" />
              </li>

              <li>
                <LanguageSwitch from="footer" />
              </li>

              {DISCORD_LINK && (
                <li>
                  <ExternalLink href={DISCORD_LINK}>
                    <Icon icon={faDiscord} />
                    <span>Discord</span>
                  </ExternalLink>
                </li>
              )}

              {REPO_LINK && (
                <li>
                  <ExternalLink href={REPO_LINK}>
                    <Icon icon={faGithub} />
                    <span>{t('navigation:contribute')}</span>
                  </ExternalLink>
                </li>
              )}
            </ul>
          </Column>
        </Column.Group>
      </Container>
    </RBXFooter>
  );
}

/**
 *
 * @param {{
 * route: typeof ROUTES[number],
 * t: import('i18next').TFunction
 * }}
 */
function InternalLink({ route: { clientPath, icon, title }, t }) {
  return (
    <Link to={clientPath}>
      {icon ? (
        <>
          <Icon icon={icon} />
          <span>{t(title)}</span>
        </>
      ) : (
        t(title)
      )}
    </Link>
  );
}
