const devSettings = {
  faqPage: true,
  vueTour: false
}

const prodSettings = {
  faqPage: "FEATURE_FLAG_FAQPAGE_PLACEHOLDER" === "true",
  vueTour: "FEATURE_FLAG_VUETOUR_PLACEHOLDER" === "true"
}

let allFeatureFlags

if (import.meta.env.DEV) {
  allFeatureFlags = devSettings
} else {
  allFeatureFlags = prodSettings
}

export default allFeatureFlags
