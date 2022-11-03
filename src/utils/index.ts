const waitFor = milliseconds => new Promise((resolve) => setTimeout(resolve, milliseconds));

// Default maximum retry attempts before throwing too many retries error.
const DEFAULT_MAX_RETRIES = 12

export const retry = async (fn: any, parameters?: any[], retries: number = 0) => {
	try {
    let outcome;
    if (parameters) {
      outcome = await fn(...parameters);
    } else {
      outcome = await fn();
    }

    return outcome;
	} catch(error) {
		if (retries > DEFAULT_MAX_RETRIES) {
      console.warn('Max retries reached.');
			throw error;
		}

    // Exponentially increase the time to wait in milliseconds.
    const timeToWait = 2 ** retries * 100;
    console.log(`Waiting for ${timeToWait} ms...`);
		await waitFor(timeToWait);
		return retry(fn, parameters, retries + 1);
	}
}
