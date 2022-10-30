import React from 'react';
// @ts-ignore
import ReactExport from 'react-export-excel';

const ExcelFile = ReactExport.ExcelFile;
const { ExcelSheet } = ReactExport.ExcelFile;

export default function DownloadExcel({
	filename,
	element,
	data,
	children,
	name,
}: any) {
	return (
		<ExcelFile filename={filename} element={element}>
			<ExcelSheet data={data} name={name}>
				{children}
			</ExcelSheet>
		</ExcelFile>
	);
}
