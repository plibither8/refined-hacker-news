import { paths } from "./paths";

function isEnabled(featureDetails, metadata) {
  const details = {
    runOnJobItems: false,
    ...featureDetails,
  };

  // Deconstructing feature details
  const { id, pages, loginRequired, runOnJobItems } = details;

  // Deconstructing metadata object
  const { path, options, user, item, logSkip = true } = metadata;

  // Don't allow on `exclude`d pages or action/info pages
  if ([...pages.exclude, ...paths.actions, ...paths.info].includes(path)) {
    return false;
  }

  // Don't allow *any* feature if `list-hn-polls...` is disabled and path is 'polls'
  if (path === "/" && window.location.hash === "#polls") {
    const disallowedFeatures = [
      "auto-refresh",
      "sort-stories",
      "more-accessible-favorite",
      "click-rank-to-vote-unvote",
    ];

    if (
      disallowedFeatures.includes(id) &&
      !options.disabledFeatures.includes("list-hn-polls-separately")
    ) {
      return false;
    }
  }

  // Allow only on `include`d pages
  if (!(pages.include.includes(path) || pages.include[0] === "*")) {
    return false;
  }

  // Skip if feature has been marked as disabled
  if (options.disabledFeatures.includes(id)) {
    if (logSkip) {
      options.log("info", "↩️️", "Skipping", id);
    }

    return false;
  }

  if (loginRequired && !user) {
    return false;
  }

  // Don't run on job items when not allowed
  if (item.type === "job" && !runOnJobItems) {
    return false;
  }

  return true;
}

function add(featureDetails, metadata) {
  const { id, init } = featureDetails;
  const { options, firstLoad } = metadata;

  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    if (!isEnabled(featureDetails, metadata)) {
      return resolve();
    }

    // Initialise and check for firstLoad
    if ((await init(metadata)) && firstLoad) {
      options.log("info", "️️️✓", id);
    }

    resolve();
  });
}

export default { add, isEnabled };
