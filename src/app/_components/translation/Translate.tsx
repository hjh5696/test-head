'use client';

import React, { useContext, useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';

import { useSearchParams, usePathname, useParams } from 'next/navigation';
import { create } from 'zustand';

const fallbackStrings = {
  ko: {
    sync: '싱크',
    skipInterval: '스킵 간격',
    showPitch: '경기장 표시',
    show: '표시',
    hide: '미표시',
    view3d: '3D뷰',
    showTrackers: '선수 트래커 표시',
    showBallTrackers: '볼 트래커 표시',
    on: '켜짐',
    off: '꺼짐',
    auto: '자동',
    addEvent: '이벤트 등록',
    skip: '스킵',
    deleteNode: '노드 삭제',
    similarPlayers: '유사한 선수',
    playerToBeAdded: '추가될 선수',
    changeFieldLinesCount: '경기장 가로 줄 수 변경',
    setAnalysisPermission: '분석 권한 설정',
    setAnalysisPermissionForSheet: '시트별 분석 권한 설정',
    noSheetAnalysisPermissionWarning: '분석 권한이 없는 시트입니다',
    usingTestServer: '테스트 서버 사용중입니다',
    prevEvent: '이전 이벤트',
    currentEvent: '현재 이벤트',
    nextEvent: '다음 이벤트',
    selectSheet: '시트를 선택해주세요',
    FIRST_HALF: '전반',
    SECOND_HALF: '후반',
    EXTRA_FIRST_HALF: '연장 전반',
    EXTRA_SECOND_HALF: '연장 후반',
    PSO: 'PSO',
    analysisNotCompleted: '분석이 완료되지 않은 경기입니다.',
    selectColor: '색 선택',
    playerNotInFormationError:
      '잘못 입력된 선수가 있습니다({0}, {1}번 선수). 포메이션을 확인해주세요',
    buildupNotEndedError: '빌드업이 종료되지 않은 상태에서 시작되었습니다({0})',
    buildupNotStartedError:
      '빌드업이 시작되지 않은 상태에서 종료되었습니다({0})',
    lastBuilupNotEndedError: '마지막 빌드업이 종료되지 않았습니다',
    ballPositionMissingError: '골대 내 공 위치가 입력되지 않았습니다',
    ballPositionShouldBeInTheTargetError:
      '공 위치가 골대 안에 입력되어야 합니다',
    ballPositionShouldBeOutOfTheTargetError:
      '공 위치가 골대 안에 입력되어야 합니다',
    ballPositionShouldntBeEnteredError: '공 위치가 입력되지 않아야 합니다',
    nodePositionMissingError: '위치가 입력되지 않은 이벤트가 있습니다. ({0})',
    defaultErrorMessage: '에러가 발생하였습니다. 다시 시도해주세요',
    checkTrackingAnalysisError: '트래킹 분석 오류 확인',
    selectEventPeriod: '전/후반 선택',
    selectTimeToAdd: '추가할 시간 입력(음수 입력 가능)',
    modifyEventTimeBatch: '이벤트 시간 일괄 수정',
    timeFormatError: '시간 형식이 올바르지 않습니다',
    modifyEventTimeConfirm:
      '{0} 팀의 {1} 이벤트 시간을 {2}만큼 더하시겠습니까?',
    multipleTrackersForTheSameTime: '같은 시간에 중복 입력된 트래커',
    assignPlayerNotInFormation: '포메이션에 없는 선수 지정',
    playerAssignedToMultipleTrackers: '동시에 여러 트래커에 지정된 선수',
    checkEachPlayers: '선수별 확인',
    referee: '심판',
    deleted: '삭제됨',
    formation: '포메이션',
    manageLineup: '라인업 관리',
    selectMatchRequired: '경기를 먼저 선택해주세요',
    changeDirection: '진영 변경',
    changeDirectionConfirm: '{0}의 공격 방향을 바꾸시겠습니까?',
    matchFullTime: '경기 시간',
    extraFullTime: '연장전 시간',
    negativeValueWillReverseColors: '음수를 입력하면 색이 반전됩니다',
    setEstimatedAnalyzeCompletionTime: '분석 완료 예상 시간 입력',
    enterScore: '점수 입력',
    setAnalysisAvailability: '분석 가능 여부 설정',
    available: '가능',
    unavailable: '불가능',
    sendMailToKLeague: 'K리그 이메일 공유',
    shareVideos: '영상 공유',
    shareReports: '분석 리포트 공유',
    showEntireEventTimeline: '전체 이벤트 타임라인',
    checkError: '오류 확인',
    addPoint: '점 추가',
    removePoint: '점 삭제',
    expand: '확장',
    showGuide: '가이드',
    reset: '초기화',
    checkExtrinsic: '값 확인',
    removeAllPoints: '점 전체 삭제',
    calculateExtrinsic: 'Extrinsic 계산',
    memoMacroShortcut: '빠른 입력 ({0} + 번호)',
    eventMemo: '이벤트 메모',
    memoPlaceholder: '내용을 입력해주세요',
    reloadTimeline: '타임라인 새로고침',
    changeFormation: '포메이션 변경',
    changedTime: '변경 시간',
    formationChangedTimeDescription: '포메이션 변경 시간을 입력해주세요',
    formationChanged: '{0} 포메이션 변경',
    bySubOrRedCard: '교체 / 퇴장에 의한',
    substitutes: '교체 선수',
    shortcutSettings: '단축키 설정',
    firstAnalysis: '1차 분석',
    secondAnalysis: '2차 분석',
    finalReview: '최종 검토',
    halfCourtMatchConfig: '하프 코트 경기 설정',
    videoStartTimeDescription: '영상 기준 시작 시간을 입력해주세요',
    videoEndTimeDescription: '영상 기준 종료 시간을 입력해주세요',
    matchStartTimeDescription: '경기 기준 시작 시간을 입력해주세요',
    matchEndTimeDescription: '경기 기준 종료 시간을 입력해주세요',
    startMatchTimeDescription: '영상의 경기 시작 시간을 입력해주세요',
    endMatchTimeDescription: '영상의 경기 시작 시간을 입력해주세요',
    to: '종료',
    partialDownload: '부분 저장',
    resizingStarted: '영상 리사이징이 시작되었습니다.',
    resizingInProgress: '영상 리사이징 중입니다. 잠시 후에 다시 확인해주세요',
    videoResizing: '영상 리사이징',
    cancelUploadConfirm: "'{0}' 파일의 업로드를 취소하시겠습니까?",
    calculatePhysicalData: '피지컬 데이터 계산',
    calculatePhysicalDataConfirm: '피지컬 데이터를 계산하시겠습니까?',
    physicalDataCalculationStarted:
      '피지컬 데이터 계산이 시작되었습니다. 잠시 후에 bepro11.com에서 확인해주세요',
    physicalDataCalculationFailed: '피지컬 데이터 계산에 실패했습니다.',
    duplicatedAssignment: '선수 중복 지정',
    playerIsAssignedToAnotherTracker: '선수는 다른 트래커에 지정되어 있습니다.',
    saveViewParameters: '뷰 설정 저장',
    brightness: '밝기',
    contrast: '대비',
    saturation: '채도',
    hue: '색상',
    restoreDefaults: '기본 설정',
    viewParametersConfig: '뷰 설정',
    scoutingViewPaused: '스카우팅 뷰 일시정지됨',
    syncCompleted: '싱크 완료',
    analysisCompleteConfirm: '분석 결과를 서비스에 반영하시겠습니까?',
    hasUnsavedChangesWarning:
      '저장되지 않은 변경 사항이 있습니다. 창을 닫으시겠습니까?',
    enterExtraTimeDuration: '연장전 시간을 분 단위로 입력해주세요.',
    enterFullMatchTimeDuration: '전체 경기 시간을 분 단위로 입력해주세요.',
    setTrackerSync: '트래커 싱크 설정',
    trackingAnalysisSectionSetting: '트래킹 분석 구간 설정',
    stitchedImage: '스티칭 영상',
    includeTestGames: '테스트 경기 포함',
    showInactiveVideos: '비활성화된 영상 표시',
    versionInfo: '버전 정보',
    analysisCompleteIgnoreErrorsConfirm:
      '분석 데이터에 오류가 있습니다. 이대로 분석완료 하시겠습니까?'
  },
  en: {
    sync: 'Sync',
    skipInterval: 'Skip time',
    showPitch: 'Show pitch image',
    show: 'Show',
    hide: 'Hide',
    view3d: '3D View',
    showTrackers: 'Show player tracker boxes',
    showBallTrackers: 'Show ball tracker boxes',
    on: 'On',
    off: 'Off',
    auto: 'Auto',
    addEvent: 'Add event',
    skip: 'skip',
    deleteNode: 'Delete node',
    similarPlayers: 'Similar players',
    playerToBeAdded: 'Player to be added',
    changeFieldLinesCount: 'Change the Number of Field Lines',
    setAnalysisPermission: 'Set Analysis Permissions',
    setAnalysisPermissionForSheet: 'Set Analysis Permissions for Each Sheet',
    noSheetAnalysisPermissionWarning:
      "You don't have permission for this sheet",
    usingTestServer: 'Using test server now',
    prevEvent: 'Previous event',
    currentEvent: 'Current event',
    nextEvent: 'Next event',
    selectSheet: 'Need to select a sheet first',
    FIRST_HALF: 'First half',
    SECOND_HALF: 'Second half',
    EXTRA_FIRST_HALF: 'Extra first half',
    EXTRA_SECOND_HALF: 'Extra second half',
    PSO: 'PSO',
    analysisNotCompleted: 'Match analysis has not been completed',
    selectColor: 'Pick a color',
    playerNotInFormationError:
      'Wrong player({0}, Shirt No. {1}). Please check formations',
    buildupNotEndedError:
      'Buildup has started before previous buildup has finished ({0})',
    buildupNotStartedError: 'Buildup ended without start event ({0})',
    lastBuilupNotEndedError: 'Last buildup has not finished',
    ballPositionMissingError: 'Ball position is missing',
    ballPositionShouldBeInTheTargetError:
      'The ball position should be inside of the goal',
    ballPositionShouldBeOutOfTheTargetError:
      'The ball position should be out of the goal',
    ballPositionShouldntBeEnteredError: "Ball position shouldn't be entered",
    nodePositionMissingError: 'Event location is missing. ({0})',
    defaultErrorMessage: 'An error occurred. Please try again later',
    checkTrackingAnalysisError: 'Check tracking analysis error',
    selectEventPeriod: 'Select half',
    selectTimeToAdd: 'Enter Time to Add (Negative number can be entered)',
    modifyEventTimeBatch: 'Batch update event times',
    timeFormatError: 'Wrong time format',
    modifyEventTimeConfirm:
      'Are you sure you want to add {2} to events for team {0} in {1}?',
    multipleTrackersForTheSameTime: 'Multiple trackers for the same time',
    assignPlayerNotInFormation: 'Assign players not in formation',
    playerAssignedToMultipleTrackers: 'Players assigned to multiple trackers',
    checkEachPlayers: 'Check each players',
    referee: 'Referee',
    deleted: 'Deleted',
    formation: 'Formation',
    manageLineup: 'Manage lineup',
    selectMatchRequired: 'Select a match first',
    changeDirection: 'Change attacking direction',
    changeDirectionConfirm:
      'Do you want to change the attacking direction for {0}?',
    matchFullTime: 'Game duration',
    extraFullTime: 'Extra time duration',
    negativeValueWillReverseColors:
      'Colors will be reversed when you enter a negative value',
    setEstimatedAnalyzeCompletionTime:
      'Enter Expected Time of Analysis Completion',
    enterScore: 'Enter score',
    setAnalysisAvailability: 'Analysis Availability',
    available: 'Available',
    unavailable: 'Unavailable',
    sendMailToKLeague: 'Send email to K-League',
    shareVideos: 'Share videos',
    shareReports: 'Share match reports',
    showEntireEventTimeline: 'Show entire event timeline',
    checkError: 'Check error',
    addPoint: 'Add a point',
    removePoint: 'Remove a point',
    expand: 'Expand',
    showGuide: 'Show guide',
    reset: 'Reset',
    checkExtrinsic: 'Check extrinsic',
    removeAllPoints: 'Remove all points',
    calculateExtrinsic: 'Calculate Extrinsic',
    memoMacroShortcut: 'Hotkey ({0} + Num)',
    eventMemo: 'Event Memo',
    memoPlaceholder: 'Enter note here',
    reloadTimeline: 'Reload timeline events',
    changedTime: 'Changed time',
    formationChangedTimeDescription: 'Formation has been changed at:',
    formationChanged: 'Formation changed {0}',
    bySubOrRedCard: 'by substitution / red card',
    substitutes: 'Substitutes',
    shortcutSettings: 'Shortcut Settings',
    firstAnalysis: '1st Analysis',
    secondAnalysis: '2nd Analysis',
    finalReview: 'Final Review',
    halfCourtMatchConfig: 'Set up half court game',
    videoStartTimeDescription: 'Start time based on video timeline',
    videoEndTimeDescription: 'End time based on video timeline',
    matchStartTimeDescription: 'Start time based on match timeline',
    matchEndTimeDescription: 'End time based on match timeline',
    startMatchTimeDescription: 'Start whistle time in the video',
    endMatchTimeDescription: 'End whistle time in the video',
    to: 'To',
    partialDownload: 'Partial download',
    resizingStarted: 'Video resizing has started',
    resizingInProgress: 'Video is being resized. Please check again later',
    videoResizing: 'Resize Video',
    cancelUploadConfirm: "Do you want to cancel uploading '{0}'?",
    calculatePhysicalData: 'Calculate physical data',
    calculatePhysicalDataConfirm:
      'Do you want to calculate physical data for this sheet?',
    physicalDataCalculationStarted:
      'Physical data calculation has started. Please check the result in bepro11.com',
    physicalDataCalculationFailed: 'Failed to calculate physical data',
    duplicatedAssignment: 'Duplicated Assignment',
    playerIsAssignedToAnotherTracker: 'is assigned to another tracker.',
    saveViewParameters: 'Save view parameters',
    brightness: 'Brightness',
    contrast: 'Contrast',
    saturation: 'Saturation',
    hue: 'Hue',
    restoreDefaults: 'Restore defaults',
    viewParametersConfig: 'Modify View Parameters',
    scoutingViewPaused: 'Scouting view paused',
    syncCompleted: 'Sync Completed',
    analysisCompleteConfirm:
      'Do you want to send the analysis results to the platform?',
    hasUnsavedChangesWarning:
      'There are unsaved changes. Do you really want to leave the window?',
    enterExtraTimeDuration: 'Enter the extra time in minutes.',
    enterFullMatchTimeDuration: 'Enter the full match time in minutes.',
    setTrackerSync: 'Tracker Sync Settings',
    trackingAnalysisSectionSetting: 'Tracking Analysis Section Settings',
    stitchedImage: 'Stitched Image',
    includeTestGames: 'Include test games',
    showInactiveVideos: 'Show inactive videos',
    versionInfo: 'Software Version',
    analysisCompleteIgnoreErrorsConfirm:
      'There are unhandled errors. Do you want to proceed without correcting them?'
  }
};

interface TranslateProps {
  stringKey: string;
  args?: any[];
}

export const translate = (string: any, args: any[] = []) => {
  string = string || '';
  return ('' + string).replace(
    /({(\d+)})/g,
    (m: any, g1: any, index: number) => args[index]
  );
};

const useLanguageState = create<{
  language: string | null;
  setLanguage: (language: string) => void;
}>(set => ({
  language: null,
  setLanguage: (language: string) => {
    set({ language });
  }
}));

export const useLanguage = () => {
  const stateLanguage = useLanguageState(state => state.language);
  const setStateLanguage = useLanguageState(state => state.setLanguage);

  const searchParams = useSearchParams();

  const params = useParams();
  const pathLanguage = (() => {
    const lang = params?.lang;
    if (Array.isArray(lang)) return lang[0];

    return lang;
  })();
  const navigatorLanguage =
    typeof window === 'undefined'
      ? 'en'
      : (window.navigator.language || 'en').substring(0, 2);

  const language =
    stateLanguage ||
    searchParams?.get('language') ||
    searchParams?.get('lang') ||
    pathLanguage ||
    navigatorLanguage;

  useEffect(() => {
    if (language) {
      setStateLanguage(language);
    }
  }, [language]);

  return language;
};

export const getFormatString = (stringKey: string, lang: string) => {
  return axios
    .get(`https://c.bepro11.com/api/translations/keys/${stringKey}/${lang}`)
    .then(res => res.data || _.get(fallbackStrings, [lang, stringKey]))
    .catch(() => _.get(fallbackStrings, [lang, stringKey]) || '');
};

const useFormatString = (stringKey: string) => {
  const [formatString, setFormatString] = useState('');
  const lang = useLanguage();

  useEffect(() => {
    if (!lang || !stringKey) return;

    if (!stringKey) return;

    getFormatString(stringKey, lang).then((res: string) =>
      setFormatString(res)
    );
  }, [stringKey, lang]);

  return formatString;
};

export const useTranslatedString = (stringKey: string, args: any[] = []) => {
  const formatString = useFormatString(stringKey);

  return translate(formatString, args);
};

export const Translate: React.FunctionComponent<TranslateProps> = ({
  stringKey,
  args = []
}) => {
  // const string = useTranslatedString(stringKey, args);
  const string = 'TTTEEEEST'

  return <>{string || <pre> </pre>}</>;
};
