/* PROTAC 全球研发管线追踪：由 scripts/update-data.mjs 维护，也可手动编辑。 */
(function (g) {
  g.PROTAC_PIPELINE_DATA = {
  "meta": {
    "name": "PROTAC 全球研发管线追踪",
    "version": "2026-08-03",
    "updatedAt": "2026-08-15T03:09:29+00:00",
    "lastChecked": "2026-08-15",
    "schedule": "每日更新一次或手动更新",
    "source": "公开资料汇编",
    "disclaimer": "数据来自企业公告、学术会议、监管文件和公开检索结果，仅用于信息追踪，不构成投资或医疗建议；具体进展请以官方来源为准。",
    "updateLog": [
      {
        "date": "2026-08-03",
        "type": "initial",
        "description": "建立首版种子库，收录全球主要 PROTAC/蛋白降解剂管线"
      },
      {
        "date": "2026-08-03",
        "type": "daily",
        "description": "初始化生成 JSON 数据源"
      },
      {
        "date": "2026-08-03",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-04",
        "type": "daily",
        "description": "今日更新"
      },
      {
        "date": "2026-08-04",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-05",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-06",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-07",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-08",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-09",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-10",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-11",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-12",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-13",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-14",
        "type": "daily",
        "description": "每日例行检查"
      },
      {
        "date": "2026-08-15",
        "type": "daily",
        "description": "每日例行检查"
      }
    ]
  },
  "pipeline": [
    {
      "id": "vepdegestrant",
      "code": "Vepdegestrant",
      "aliases": [
        "ARV-471"
      ],
      "company": "Arvinas / Pfizer",
      "country": "美国",
      "target": "ERα (ESR1)",
      "indication": "HR+/HER2−、ESR1 突变转移性乳腺癌",
      "lifecycle": "商业化",
      "phase": "已上市",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "全球",
      "status": "活跃",
      "source": "FDA 批准（2026-05-01）",
      "notes": "全球首个获 FDA 批准的经典 PROTAC，由关键研究 VERITAC-2 支持，Arvinas 与 Pfizer 共同开发和商业化。",
      "milestones": [
        {
          "date": "2026-05-01",
          "title": "FDA 批准上市，成为全球首个 PROTAC 药物",
          "source": "FDA / Arvinas"
        },
        {
          "date": "2026-03",
          "title": "ASCO 2026 发布联合 CDK4/6 抑制剂探索数据",
          "source": "ASCO 2026"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "bavdegalutamide",
      "code": "Bavdegalutamide",
      "aliases": [
        "ARV-110"
      ],
      "company": "Arvinas",
      "country": "美国",
      "target": "雄激素受体 AR",
      "indication": "转移性去势抵抗性前列腺癌（mCRPC）",
      "lifecycle": "开发",
      "phase": "Phase 2",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Arvinas 2026 企业更新",
      "notes": "针对 AR 全长及 AR-V7 的口服 PROTAC，正在扩展剂量队列，并与 FDA 讨论潜在加速审批路径。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "Phase 2 剂量扩展队列更新数据",
          "source": "Arvinas"
        },
        {
          "date": "2026-04",
          "title": "计划与 FDA 讨论加速审批路径",
          "source": "Arvinas Q1 2026"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "luxdegalutamide",
      "code": "Luxdegalutamide",
      "aliases": [
        "ARV-766"
      ],
      "company": "Arvinas",
      "country": "美国",
      "target": "雄激素受体 AR",
      "indication": "mCRPC 及其他 AR 驱动实体瘤",
      "lifecycle": "开发",
      "phase": "Phase 1/2",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Arvinas 管线",
      "notes": "下一代 AR PROTAC，设计目标覆盖 AR 配体结合域突变等耐药场景。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "继续推进 Phase 1/2 剂量探索",
          "source": "Arvinas"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "arv-102",
      "code": "ARV-102",
      "aliases": [],
      "company": "Arvinas",
      "country": "美国",
      "target": "LRRK2",
      "indication": "帕金森病、进行性核上性麻痹（PSP）",
      "lifecycle": "开发",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Arvinas 新闻稿（2026-03）",
      "notes": "可穿透血脑屏障的 LRRK2 降解剂，Phase 1 显示 LRRK2 蛋白和神经炎症生物标志物下降；计划开展 PSP 患者 Phase 1b。",
      "milestones": [
        {
          "date": "2026-07",
          "title": "Phase 1 数据支持进一步开发 LRRK2 降解剂",
          "source": "NeurologyLive"
        },
        {
          "date": "2026-03",
          "title": "发布阳性 Phase 1 临床数据",
          "source": "Arvinas"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "arv-027",
      "code": "ARV-027",
      "aliases": [],
      "company": "Arvinas",
      "country": "美国",
      "target": "polyQ-AR",
      "indication": "脊髓延髓肌萎缩症（SBMA，Kennedy 病）",
      "lifecycle": "开发",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Arvinas 2026 企业更新",
      "notes": "针对 polyglutamine 重复扩增雄激素受体的小分子降解剂，2026 年启动健康受试者及 SBMA 患者首次人体研究。",
      "milestones": [
        {
          "date": "2026-03",
          "title": "开始 ARV-027 首次人体给药",
          "source": "Arvinas"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "arv-6723",
      "code": "ARV-6723",
      "aliases": [],
      "company": "Arvinas",
      "country": "美国",
      "target": "HPK1",
      "indication": "晚期实体瘤（免疫肿瘤学）",
      "lifecycle": "研发",
      "phase": "临床前",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国",
      "status": "计划进入临床",
      "source": "Arvinas 管线",
      "notes": "Arvinas 首个免疫肿瘤学临床候选药物，2026 年拟推进首次人体试验。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "处于首次人体试验准备阶段",
          "source": "Arvinas"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "kt-621",
      "code": "KT-621",
      "aliases": [],
      "company": "Kymera Therapeutics",
      "country": "美国",
      "target": "STAT6",
      "indication": "中重度特应性皮炎、嗜酸性粒细胞性哮喘",
      "lifecycle": "开发",
      "phase": "Phase 2",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Kymera 2026 新闻稿",
      "notes": "口服 STAT6 降解剂；AD Phase 2b BROADEN2 完成入组，数据预计 2026 年底；哮喘 BREADTH 数据预计 2027 年底；AD Phase 3 计划 2027 年中启动。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "BROADEN2 特应性皮炎 Phase 2b 完成入组",
          "source": "Kymera"
        },
        {
          "date": "2026-04",
          "title": "KT-621 获 FDA 快速通道资格",
          "source": "Kymera"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "kt-474",
      "code": "KT-474",
      "aliases": [
        "SAR444656"
      ],
      "company": "Kymera / Sanofi",
      "country": "美国/欧盟",
      "target": "IRAK4",
      "indication": "化脓性汗腺炎、特应性皮炎",
      "lifecycle": "开发",
      "phase": "Phase 2",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Sanofi / Kymera 临床更新",
      "notes": "与 Sanofi 合作的口服 IRAK4 降解剂，Phase 2 在 HS 与 AD 中推进；Sanofi 同时关注第二代降解剂 KT-485。",
      "milestones": [
        {
          "date": "2026-05",
          "title": "AD Phase 2 试验完成首例给药",
          "source": "Dermatology Times"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "kt-485",
      "code": "KT-485",
      "aliases": [],
      "company": "Kymera / Sanofi",
      "country": "美国",
      "target": "IRAK4",
      "indication": "自身免疫与炎症性疾病",
      "lifecycle": "研发",
      "phase": "临床前",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国",
      "status": "计划进入临床",
      "source": "Kymera 2025 企业更新",
      "notes": "第二代 IRAK4 降解剂，Phase 1 计划于 2026 年启动。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "Phase 1 准备推进中",
          "source": "Kymera"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "kt-333",
      "code": "KT-333",
      "aliases": [],
      "company": "Kymera Therapeutics",
      "country": "美国",
      "target": "STAT3",
      "indication": "复发/难治性淋巴瘤、大颗粒淋巴细胞白血病、实体瘤",
      "lifecycle": "终止",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国",
      "status": "已终止",
      "source": "Kymera 2024 Q3 企业更新",
      "notes": "公司基于肿瘤管线整体评估，决定 Phase 1 完成后不再继续推进 STAT3 项目。",
      "milestones": [
        {
          "date": "2024-10",
          "title": "宣布不再继续推进 KT-333 Phase 1 之后开发",
          "source": "Kymera"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "kt-253",
      "code": "KT-253",
      "aliases": [],
      "company": "Kymera Therapeutics",
      "country": "美国",
      "target": "MDM2",
      "indication": "血液肿瘤与实体瘤",
      "lifecycle": "终止",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国",
      "status": "已终止",
      "source": "Kymera 2024 Q3 企业更新",
      "notes": "Phase 1 入组完成后，公司决定不再推进 MDM2 项目。",
      "milestones": [
        {
          "date": "2024-10",
          "title": "宣布 KT-253 Phase 1 后停止推进",
          "source": "Kymera"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "bexobrutideg",
      "code": "Bexobrutideg",
      "aliases": [
        "NX-5948"
      ],
      "company": "Nurix / Roche",
      "country": "美国",
      "target": "BTK",
      "indication": "复发/难治性 CLL/SLL、B 细胞恶性肿瘤",
      "lifecycle": "开发",
      "phase": "Phase 2",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Nurix 2026 新闻稿",
      "notes": "口服 BTK 降解剂；正在开展关键单臂 Phase 2 研究，并与 Roche 达成合作，计划开展与 pirtobrutinib 对照的随机 Phase 3。",
      "milestones": [
        {
          "date": "2026-07",
          "title": "Nurix-Roche 的 BTK 降解剂合作完成反垄断审查",
          "source": "AllSci"
        },
        {
          "date": "2026-05",
          "title": "EHA 2026 口头报告 Bexobrutideg 数据",
          "source": "Nurix"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "nx-2127",
      "code": "NX-2127",
      "aliases": [
        "Zelebrudomide"
      ],
      "company": "Nurix Therapeutics",
      "country": "美国",
      "target": "BTK / IKZF",
      "indication": "复发/难治性 B 细胞恶性肿瘤",
      "lifecycle": "开发",
      "phase": "Phase 1/2",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国",
      "status": "活跃",
      "source": "Nurix 管线",
      "notes": "口服 BTK 降解剂，兼具免疫调节活性；在 B 细胞恶性肿瘤中探索，同时评估自身免疫适应症。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "Phase 1/2 研究继续推进",
          "source": "Nurix"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "nx-1607",
      "code": "NX-1607",
      "aliases": [],
      "company": "Nurix Therapeutics",
      "country": "美国",
      "target": "CBL-B",
      "indication": "晚期实体瘤",
      "lifecycle": "开发",
      "phase": "Phase 1/2",
      "modality": "PROTAC",
      "e3": "未披露",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Nurix 管线",
      "notes": "CBL-B 抑制剂/降解剂方向，用于增强免疫抗肿瘤活性，处于早期临床探索。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "Phase 1/2 实体瘤研究持续入组",
          "source": "Nurix"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "cft-1946",
      "code": "CFT1946",
      "aliases": [],
      "company": "C4 Therapeutics",
      "country": "美国",
      "target": "BRAF V600",
      "indication": "BRAF V600 突变实体瘤",
      "lifecycle": "终止",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国",
      "status": "已终止",
      "source": "C4 Therapeutics 2026 SEC 文件",
      "notes": "公司基于临床数据和资源配置决定不将 BRAF V600 降解剂推进到 Phase 1 之后。",
      "milestones": [
        {
          "date": "2026-04",
          "title": "决定不推进 CFT1946 Phase 1 后开发",
          "source": "C4 Therapeutics"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "cft-8634",
      "code": "CFT8634",
      "aliases": [],
      "company": "C4 Therapeutics",
      "country": "美国",
      "target": "BRD9",
      "indication": "滑膜肉瘤等 BRD9 相关肿瘤",
      "lifecycle": "终止",
      "phase": "Phase 1",
      "modality": "BiDAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国",
      "status": "已终止",
      "source": "C4 Therapeutics 2026 管线",
      "notes": "BRD9 BiDAC 早期临床项目，2026 年公开信息显示已不再作为推进管线。",
      "milestones": [
        {
          "date": "2026-04",
          "title": "管线状态标记为未继续推进",
          "source": "C4 Therapeutics"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "cemsidomide",
      "code": "Cemsidomide",
      "aliases": [
        "CFT7455"
      ],
      "company": "C4 Therapeutics",
      "country": "美国",
      "target": "IKZF1/3 降解",
      "indication": "多发性骨髓瘤",
      "lifecycle": "开发",
      "phase": "Phase 1/2",
      "modality": "分子胶降解剂",
      "e3": "CRBN",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "C4 Therapeutics 2026 企业更新",
      "notes": "下一代分子胶降解剂，公司重点推进项目；Phase 1b 联合 elranatamab 研究结果预计 2026 下半年。",
      "milestones": [
        {
          "date": "2026-05",
          "title": "Phase 1b 联合研究数据预期更新",
          "source": "C4 Therapeutics"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "cft-8919",
      "code": "CFT8919",
      "aliases": [],
      "company": "C4 Therapeutics / 贝达药业（大中华区）",
      "country": "美国/中国",
      "target": "EGFR L858R",
      "indication": "EGFR 突变非小细胞肺癌",
      "lifecycle": "开发",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "中国/美国",
      "status": "境外暂停、大中华区继续",
      "source": "C4 Therapeutics / 贝达药业 2026 公告",
      "notes": "C4 决定暂不推进境外开发；不影响贝达药业在大中华区的独家开发与商业化权益。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "贝达药业确认继续推进大中华区 CFT8919 临床",
          "source": "贝达药业"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "setidegrasib",
      "code": "Setidegrasib",
      "aliases": [
        "ASP3082"
      ],
      "company": "Astellas Pharma",
      "country": "日本",
      "target": "KRAS G12D",
      "indication": "KRAS G12D 突变非小细胞肺癌、胰腺癌等实体瘤",
      "lifecycle": "开发",
      "phase": "Phase 2",
      "modality": "PROTAC",
      "e3": "未披露",
      "route": "静脉注射",
      "region": "全球",
      "status": "活跃",
      "source": "Astellas / MSKCC 2026",
      "notes": "首个进入临床的 KRAS G12D 蛋白降解剂；全球 Phase 1 显示推荐剂量下 NSCLC 客观缓解率约 35%，并进入胰腺癌等扩展队列。",
      "milestones": [
        {
          "date": "2026-04",
          "title": "ASCO/学术会议更新 Phase 1 扩展数据",
          "source": "Healio"
        },
        {
          "date": "2026-03",
          "title": "发布肺癌与胰腺癌早期活性数据",
          "source": "MSKCC"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "hrs-5041",
      "code": "HRS-5041",
      "aliases": [],
      "company": "恒瑞医药",
      "country": "中国",
      "target": "雄激素受体 AR",
      "indication": "转移性去势抵抗性前列腺癌",
      "lifecycle": "开发",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "未披露",
      "route": "口服",
      "region": "中国",
      "status": "活跃",
      "source": "恒瑞医药公告 / ASCO 2026",
      "notes": "新型高选择性 AR PROTAC，对野生型和多数突变型 AR 具有降解作用；2026 年 ASCO 发布首个人体 Phase 1 研究。",
      "milestones": [
        {
          "date": "2026-05",
          "title": "ASCO 2026 发布 mCRPC Phase 1 结果",
          "source": "JCO / ASCO"
        },
        {
          "date": "2026-01",
          "title": "获药物临床试验批准通知书",
          "source": "恒瑞医药"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "hrs-1358",
      "code": "HRS-1358",
      "aliases": [],
      "company": "恒瑞医药",
      "country": "中国",
      "target": "雌激素受体 ER",
      "indication": "晚期或转移性乳腺癌",
      "lifecycle": "开发",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "未披露",
      "route": "口服",
      "region": "中国",
      "status": "活跃",
      "source": "恒瑞医药公告",
      "notes": "恒瑞布局的 ER 降解 PROTAC 小分子，剂型为片剂，用于晚期乳腺癌及联合方案探索。",
      "milestones": [
        {
          "date": "2026-02",
          "title": "联合用药临床方案公开",
          "source": "恒瑞医药"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "bgb-16673",
      "code": "BGB-16673",
      "aliases": [],
      "company": "百济神州",
      "country": "中国/美国",
      "target": "BTK",
      "indication": "复发/难治性 CLL/SLL 及 B 细胞恶性肿瘤",
      "lifecycle": "开发",
      "phase": "Phase 1/2",
      "modality": "BTK 嵌合降解剂",
      "e3": "未披露",
      "route": "口服",
      "region": "全球",
      "status": "活跃",
      "source": "百济神州 / EHA 2026",
      "notes": "CaDAnCe-101 数据显示复发/难治性 CLL/SLL 高缓解率与持久缓解；计划开展 Phase 2，潜在加速审批申报预计 2026 下半年。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "EHA 2026 公布 CaDAnCe-101 数据",
          "source": "百济神州"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "catadegbrutinib",
      "code": "Catadegbrutinib",
      "aliases": [],
      "company": "BeOne Medicines",
      "country": "美国/中国",
      "target": "BTK",
      "indication": "CLL/SLL",
      "lifecycle": "开发",
      "phase": "Phase 1/2",
      "modality": "PROTAC",
      "e3": "CRBN",
      "route": "口服",
      "region": "全球",
      "status": "活跃",
      "source": "ASCO 2026 行业综述",
      "notes": "BTK 降解剂，与 zanubrutinib 形成百济相关产品组合协同；用于克服 BTK 抑制剂耐药。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "Phase 1/2 继续推进",
          "source": "BeOne"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "kpg-121",
      "code": "KPG-121",
      "aliases": [],
      "company": "康朴生物",
      "country": "中国",
      "target": "AR 降解",
      "indication": "mCRPC",
      "lifecycle": "开发",
      "phase": "Phase 2/3",
      "modality": "分子胶降解剂",
      "e3": "未披露",
      "route": "口服",
      "region": "中国/美国",
      "status": "活跃",
      "source": "Targeted Oncology / Urology Times 2026",
      "notes": "FDA 已批准 KPG-121 联合 abiraterone 用于一线 mCRPC 的 Phase 2/3 研究。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "FDA 批准 KPG-121 联合 abiraterone 的 Phase 2/3 试验",
          "source": "Urology Times"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "gt-919",
      "code": "GT-919",
      "aliases": [
        "GT919"
      ],
      "company": "标新生物",
      "country": "中国",
      "target": "IKZF1/IKZF3",
      "indication": "POEMS 综合征、多发性骨髓瘤",
      "lifecycle": "开发",
      "phase": "Phase 2",
      "modality": "分子胶降解剂",
      "e3": "CRBN",
      "route": "口服",
      "region": "中国",
      "status": "活跃",
      "source": "标新生物公告",
      "notes": "高选择性口服分子胶降解剂；POEMS 综合征 Phase 2 于 2025 年 12 月在中国完成首例入组。",
      "milestones": [
        {
          "date": "2025-12",
          "title": "POEMS 综合征 Phase 2 首例患者入组",
          "source": "标新生物"
        },
        {
          "date": "2025-11",
          "title": "ASH 2025 披露 Phase 1 临床结果",
          "source": "标新生物"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "mt-4561",
      "code": "MT-4561",
      "aliases": [],
      "company": "三菱田边制药",
      "country": "日本",
      "target": "BRD4",
      "indication": "晚期实体瘤、胆道肿瘤",
      "lifecycle": "开发",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "未披露",
      "route": "口服",
      "region": "日本/美国",
      "status": "活跃",
      "source": "ASCO 2026 行业综述",
      "notes": "BRD4 降解剂，处于实体瘤和胆道肿瘤的早期临床评估。",
      "milestones": [
        {
          "date": "2026-06",
          "title": "Phase 1 实体瘤队列继续推进",
          "source": "三菱田边"
        }
      ],
      "lastUpdated": "2026-08-03"
    },
    {
      "id": "r07656594",
      "code": "R07656594",
      "aliases": [],
      "company": "Genentech / Roche",
      "country": "美国",
      "target": "雄激素受体 AR",
      "indication": "转移性去势抵抗性前列腺癌",
      "lifecycle": "开发",
      "phase": "Phase 1",
      "modality": "PROTAC",
      "e3": "未披露",
      "route": "口服",
      "region": "美国/欧盟",
      "status": "活跃",
      "source": "Annual Reviews 2025 综述",
      "notes": "Roche/Genentech 的 AR PROTAC 早期临床项目，登记号 NCT05800665。",
      "milestones": [
        {
          "date": "2025-12",
          "title": "Phase 1 研究推进中",
          "source": "NCT05800665"
        }
      ],
      "lastUpdated": "2026-08-03"
    }
  ]
};
})(typeof window !== "undefined" ? window : globalThis);
