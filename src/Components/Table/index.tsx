import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RemoveMember } from "../../actions/MemberActions";
import Icon from "../Icons/index";
import moment from "moment";
import "./style.css";

interface FormSubmission {
  id: string;
  formData: {
    name: string;
    companyName: string;
    status: string;
    notes: string;
    lastUpdatedAt: string;
  };
}

const Table: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
  const [tableData, setTableData] = useState(
    JSON.parse(localStorage.getItem("formData") || "{}") as FormSubmission[]
  );
  const [selectedCompany, setSelectedCompany] = useState("");
  const [isSelectAll, setSelectAll] = useState(false);

  const dispatch = useDispatch<any>();

  const options = [
    { value: "DC United", label: "DC United" },
    { value: "Manchester United", label: "Manchester United" },
    { value: "LA Galaxy", label: "LA Galaxy" },
    { value: "Select all", label: "Select all" },
  ];

  const sortOptions = [
    { value: "Active", label: "Active" },
    { value: "Closed", label: "Closed" },
  ];

  const deleteHandler = (id: string) => {
    const existingData = JSON.parse(localStorage.getItem("formData") || "{}");
    const filterData = existingData.filter((curr: FormSubmission) => curr.id !== id);

    localStorage.setItem("formData", JSON.stringify(filterData));
    setTableData(filterData);
    dispatch(RemoveMember(id));
  };

  const handleSort = (status: string) => {
    setTableData(tableData.filter((curr) => curr.formData.status === status));
  };

  useEffect(() => {
    setTableData(JSON.parse(localStorage.getItem("formData") || "{}"));
  }, [isOpen]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <select
          onChange={(e) => {
            if (e.target.value === "Select all") {
              setSelectAll(true);
            }
            setSelectedCompany(e.target.value);
          }}
          style={{ padding: "10px", marginRight: "10px", marginLeft: "10px" }}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="">Select an sort status</option>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <table className="padding-table-columns">
        <thead>
          <tr key="heading">
            <th>
              <input
                type="checkbox"
                checked={isSelectAll}
                onChange={() => {
                  setSelectAll(!isSelectAll);
                }}
              />
            </th>
            <th>Name</th>
            <th>Company Name</th>
            <th>Status</th>
            <th>Last Updated at</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {tableData && tableData.length
            ? tableData.map((submission: FormSubmission, index: number) => (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={
                        selectedCompany === submission.formData.companyName
                          ? true
                          : isSelectAll
                      }
                      onChange={() => {
                        if (isSelectAll) {
                          setSelectAll(false);
                        }
                        setSelectedCompany(submission.formData.companyName);
                      }}
                    />
                  </td>
                  <td>{submission.formData?.name}</td>
                  <td>{submission.formData?.companyName}</td>
                  <td>{submission.formData?.status}</td>
                  <td>
                    {moment(submission.formData?.lastUpdatedAt).format(
                      "DD/MM/YY"
                    )}
                  </td>
                  <td>{submission.formData?.notes}</td>
                  <td
                    onClick={() => deleteHandler(submission.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <Icon name="delete" height={25} width={25} />
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
