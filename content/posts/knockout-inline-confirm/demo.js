import "knockout-inline-confirm";

import ko from "knockout";
import React, { useEffect } from "react";

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
			/>
		</div>
	);
};

export default KnockoutInlineConfirmDemo;
