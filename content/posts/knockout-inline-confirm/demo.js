import React, { useEffect } from "react";

import ko from "knockout";
import "knockout-inline-confirm";

function ViewModel() {
	this.doit = function () {
		setTimeout(function () {
			alert("the thing is done!");
		}, 1000);
	};
}

const KnockoutInlineConfirmDemo = () => {
	useEffect(() => {
		ko.applyBindings(
			new ViewModel(),
			document.getElementById("knockout-confirm-demo")
		);
	});

	return (
		<div id="knockout-confirm-demo" style={{ textAlign: "center" }}>
			<button
				data-bind="inlineConfirm: ['Do the thing', 'Are you sure you want to do the thing?', 'Doing the thing…'], submitFunction: doit"
				className="btn btn-primary"
			></button>
		</div>
	);
};

export default KnockoutInlineConfirmDemo;
