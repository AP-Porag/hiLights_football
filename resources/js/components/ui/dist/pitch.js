"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Pitch = void 0;
var react_1 = require("react");
var react_2 = require("@inertiajs/react");
var POSITION_ZONES = [
    { id: 'GK', label: 'GK', cx: 30, cy: 100 },
    { id: 'LB', label: 'LB', cx: 75, cy: 40 },
    { id: 'CB-L', label: 'CB', cx: 80, cy: 80 },
    { id: 'CB-R', label: 'CB', cx: 80, cy: 120 },
    { id: 'RB', label: 'RB', cx: 75, cy: 160 },
    { id: 'LM', label: 'LM', cx: 145, cy: 40 },
    { id: 'CM-L', label: 'CM', cx: 145, cy: 80 },
    { id: 'CM-R', label: 'CM', cx: 145, cy: 120 },
    { id: 'RM', label: 'RM', cx: 145, cy: 160 },
    { id: 'CAM', label: 'CAM', cx: 200, cy: 100 },
    { id: 'LW', label: 'LW', cx: 235, cy: 50 },
    { id: 'ST', label: 'ST', cx: 260, cy: 100 },
    { id: 'RW', label: 'RW', cx: 235, cy: 150 },
    { id: 'CF', label: 'CF', cx: 245, cy: 100 },
];
exports.Pitch = function () {
    var _a = react_2.useForm({
        full_name: 'Lucas Henrique Silva',
        nickname: 'Luquinhas',
        dob: '2008-03-14',
        gender: 'M',
        height: '178',
        birth_city: 'São Paulo',
        birth_country: 'BR',
        nationality: 'BR',
        current_club: 'Santos FC U-17',
        in_team_since: '2024-01',
        agent: '',
        guardian_name: '',
        modality: 'Football',
        positions: ['CAM', 'ST'],
        foot: 'Right',
        photo: null,
        photo_preview: '',
        video_url: '',
        description: ''
    }), data = _a.data, setData = _a.setData, processing = _a.processing;
    var togglePosition = function (id) {
        if (data.positions.includes(id)) {
            setData('positions', data.positions.filter(function (p) { return p !== id; }));
        }
        else if (data.positions.length < 3) {
            setData('positions', __spreadArrays(data.positions, [id]));
        }
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "" },
            react_1["default"].createElement("div", { className: "" },
                react_1["default"].createElement("svg", { viewBox: "0 0 300 200", className: "w-full" },
                    react_1["default"].createElement("defs", null,
                        react_1["default"].createElement("linearGradient", { id: "pitchBg", x1: "0%", y1: "0%", x2: "100%", y2: "0%" },
                            react_1["default"].createElement("stop", { offset: "0%", stopColor: "#045b0d" }),
                            react_1["default"].createElement("stop", { offset: "15%", stopColor: "#0a6d12" }),
                            react_1["default"].createElement("stop", { offset: "30%", stopColor: "#045b0d" }),
                            react_1["default"].createElement("stop", { offset: "45%", stopColor: "#0a6d12" }),
                            react_1["default"].createElement("stop", { offset: "60%", stopColor: "#045b0d" }),
                            react_1["default"].createElement("stop", { offset: "75%", stopColor: "#0a6d12" }),
                            react_1["default"].createElement("stop", { offset: "90%", stopColor: "#045b0d" }),
                            react_1["default"].createElement("stop", { offset: "100%", stopColor: "#0a6d12" }))),
                    react_1["default"].createElement("rect", { x: "0", y: "0", width: "300", height: "200", fill: "url(#pitchBg)" }),
                    react_1["default"].createElement("rect", { x: "2", y: "2", width: "296", height: "196", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                    react_1["default"].createElement("line", { x1: "150", y1: "2", x2: "150", y2: "198", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                    react_1["default"].createElement("circle", { cx: "150", cy: "100", r: "22", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                    react_1["default"].createElement("rect", { x: "2", y: "55", width: "40", height: "90", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                    react_1["default"].createElement("rect", { x: "258", y: "55", width: "40", height: "90", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                    react_1["default"].createElement("rect", { x: "2", y: "75", width: "15", height: "50", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                    react_1["default"].createElement("rect", { x: "283", y: "75", width: "15", height: "50", fill: "none", stroke: "rgba(255,255,255,0.3)", strokeWidth: "1" }),
                    POSITION_ZONES.map(function (p) {
                        var selected = data.positions.includes(p.id);
                        return (react_1["default"].createElement("g", { key: p.id, onClick: function () { return togglePosition(p.id); }, style: { cursor: 'pointer' }, className: "group" },
                            react_1["default"].createElement("circle", { cx: p.cx, cy: p.cy, r: "14", fill: selected ? 'rgba(255,107,0,0.85)' : 'transparent', stroke: selected ? '#FF6B00' : 'rgba(255,255,255,0.4)', strokeWidth: "1.5", className: "group-hover:fill-[rgba(255,107,0,0.3)] transition-colors" }),
                            react_1["default"].createElement("text", { x: p.cx, y: p.cy, textAnchor: "middle", dominantBaseline: "central", fontSize: "8", fontWeight: "700", fill: selected ? '#FFFFFF' : 'rgba(255,255,255,0.7)', style: { pointerEvents: 'none' } }, p.label)));
                    }))))));
};
