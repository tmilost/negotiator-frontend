#!/bin/bash

echo "Replacing env constants in JS"
for file in assets/index.*.js;
do
  echo "Processing $file ...";

  sed -i 's|AUTH_URL_PLACEHOLDER|'${AUTH_URL}'|g' $file
  sed -i 's|CLIENT_ID_PLACEHOLDER|'${CLIENT_ID}'|g' $file
  sed -i 's|REDIRECT_URI_PLACEHOLDER|'${REDIRECT_URI}'|g' $file
  sed -i 's|LOGOUT_URI_PLACEHOLDER|'${LOGOUT_URI}'|g' $file
  sed -i 's|RESOURCES_PLACEHOLDER|'${API_RESOURCES}'|g' $file
  sed -i 's|MATOMO_HOST_PLACEHOLDER|'${MATOMO_HOST}'|g' $file
  sed -i 's|MATOMO_SITE_ID_PLACEHOLDER|'${MATOMO_SITE_ID}'|g' $file
  sed -i 's|ACTIVE_THEME_PLACEHOLDER|'${ACTIVE_THEME:-bbmri}'|g' $file
  sed -i 's|ACTIVE_LOGOS_PLACEHOLDER|'${ACTIVE_LOGOS:-bbmri}'|g' $file
  sed -i 's|FOLLOW_US_VISIBLE_PLACEHOLDER|'${FOLLOW_US_VISIBLE:-true}'|g' $file
  sed -i 's|FEATURE_FLAG_FAQPAGE_PLACEHOLDER|'${FEATURE_FLAG_FAQPAGE:-false}'|g' $file
  sed -i 's|FEATURE_FLAG_VUETOUR_PLACEHOLDER|'${FEATURE_FLAG_VUETOUR:-false}'|g' $file
  sed -i 's|FEATURE_FLAG_NOTIFICATIONS|'${FEATURE_FLAG_NOTIFICATIONS:-false}'|g' $file
  sed -i 's|EXTERNAL_LINK_DIRECTORY_PLACEHOLDER|'${EXTERNAL_LINK_DIRECTORY:-https://directory.bbmri-eric.eu}'|g' $file

done

exec nginx -g 'daemon off;'
