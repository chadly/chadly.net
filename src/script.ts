// https://usehooks.com/useScript/

import { useEffect, useState } from "react";

type ScriptStatus = "idle" | "loading" | "ready" | "error";

const useScript = (src?: string): ScriptStatus => {
	// Keep track of script status ("idle", "loading", "ready", "error")
	const [status, setStatus] = useState<ScriptStatus>(src ? "loading" : "idle");

	useEffect(() => {
		if (typeof window === "undefined") return;

		// Allow falsy src value if waiting on other data needed for
		// constructing the script URL passed to this hook.
		if (!src) {
			setStatus("idle");
			return;
		}

		// Fetch existing script element by src
		// It may have been added by another instance of this hook
		let script: HTMLScriptElement | null =
			document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);

		if (!script) {
			// Create script
			script = document.createElement("script");
			script.src = src;
			script.async = true;
			script.dataset.status = "loading";

			// Add script to document body
			document.body.append(script);

			// Store status in attribute on script
			// This can be read by other instances of this hook
			const setAttributeFromEvent = (event: Event) => {
				if (script) {
					script.dataset.status = event.type === "load" ? "ready" : "error";
				}
			};

			script.addEventListener("load", setAttributeFromEvent);
			script.addEventListener("error", setAttributeFromEvent);
		} else {
			// Grab existing script status from attribute and set to state.
			setStatus(script.getAttribute("data-status") as ScriptStatus);
		}

		// Script event handler to update status in state
		// Note: Even if the script already exists we still need to add
		// event handlers to update the state for *this* hook instance.
		const setStateFromEvent = (event: Event) => {
			setStatus(event.type === "load" ? "ready" : "error");
		};

		// Add event listeners
		script.addEventListener("load", setStateFromEvent);
		script.addEventListener("error", setStateFromEvent);

		// Remove event listeners on cleanup
		return () => {
			if (script) {
				script.removeEventListener("load", setStateFromEvent);
				script.removeEventListener("error", setStateFromEvent);
			}
		};
	}, [src]);

	return status;
};

export default useScript;
